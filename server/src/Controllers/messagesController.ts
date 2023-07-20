import { Response } from 'express';

import { IAuthentication } from '../Interfaces';
import { createChat, getChatIdByUserId, getChatUserByChatId } from '../Dao/chatsDao';
import { createMessage, getMessages, setMessagesRead } from '../Dao/messagesDao';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getMessagesController = async (req: IAuthentication, res: Response) => {
	try {
		const { chat_id } = req.query; // for support assistant

		let chatId = chat_id;

		if (!chatId) {
			const userChat = await getChatIdByUserId({ user_id: req.roleId as string });

			if (!userChat) {
				res.json({ status: 200, data: [] });
				return;
			} // т.е чат ещё не создан

			chatId = userChat.id;
		}

		const messages = await getMessages({ chat_id: chatId as string });
		res.json({ status: 200, data: messages });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const createMessageController = async (req: IAuthentication, res: Response) => {
	try {
		const { text, chat_id } = req.body; // chat_id for support assistant

		let chatId = chat_id;

		if (!chatId) {
			const userChat = await getChatIdByUserId({ user_id: req.roleId as string });

			if (!userChat) chatId = (await createChat({ user_id: req.roleId as string }))[0].id;
			else chatId = userChat.id;
		}

		const createdMessage = await createMessage({
			sender_id: req.roleId as string,
			chat_id: chatId,
			text,
		});
		if (!createdMessage) {
			res.json({
				status: 500,
				data: 'Ошибка в процессе создания сообщения. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 201, data: 'Успешно' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const setMessagesReadController = async (req: IAuthentication, res: Response) => {
	try {
		const { chat_Id } = req.body; // только админ отправляет chat_id

		if (chat_Id === undefined) {
			const chat = await getChatIdByUserId({ user_id: req.roleId as string });
			if (chat === undefined) {
				res.json({ status: 200, data: 'Успешно' });
				return;
			} // т.е чат ещё не создан

			await setMessagesRead({ sender_id: req.roleId as string, chat_id: chat.id });
		} else {
			const chatUser = await getChatUserByChatId({ id: chat_Id });
			await setMessagesRead({ sender_id: chatUser.user_id, chat_id: chat_Id, admin: true });
		}

		res.json({ status: 200, data: 'Успешно' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

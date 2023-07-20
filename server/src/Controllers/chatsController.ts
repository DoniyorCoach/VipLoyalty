import { Response } from 'express';

import { IAuthentication } from '../Interfaces';
import { getAdminById, getCustomerById } from '../Dao/credentialsDao';
import { getChatIdByUserId, getChatUserByChatId, getChats } from '../Dao/chatsDao';
import { getMessages } from '../Dao/messagesDao';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getChatsController = async (req: IAuthentication, res: Response) => {
	try {
		const isAdmin = await getAdminById({ id: req.roleId as string });
		if (!isAdmin) {
			res.json({
				status: 403,
				data: 'У Вас нет прав доступа к данной информации',
			});
			return;
		}

		const chats = await getChats();
		res.json({ status: 200, data: chats.reverse() });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getChatUserController = async (req: IAuthentication, res: Response) => {
	try {
		const { userId, chatId } = req.body;

		if (!userId && !chatId) {
			const chat = await getChatIdByUserId({ user_id: req.roleId as string });
			if (!chat) {
				res.json({
					status: 200,
				});
				return; // чат ещё не создался
			}
			const messages = await getMessages({ chat_id: chat.id });

			const unreadMessages = messages.some(
				(message) => message.sender_id !== req.roleId && !message.is_read,
			);

			res.json({
				status: 200,
				data: unreadMessages,
			});
			return;
		}

		const isAdmin = await getAdminById({ id: req.roleId as string });
		if (!isAdmin) {
			res.json({
				status: 403,
				data: 'У Вас нет прав доступа к данной информации',
			});
			return;
		}

		const user = await getCustomerById({ id: userId });
		const chatUser = await getChatUserByChatId({ id: chatId });

		const messages = await getMessages({ chat_id: chatId });

		const unreadMessages = messages.some(
			(message) => message.sender_id === chatUser.user_id && !message.is_read,
		);

		res.json({
			status: 200,
			data: {
				gender: user.gender,
				fio: user.fio,
				lastMessage: messages.pop().text,
				unreadMessages,
			},
		});
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

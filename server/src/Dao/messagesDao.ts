import db from '../Database/connection';
import { ICreateMessage, IGetMessages, ISetMessagesRead } from '../Interfaces';

export const getMessages = async ({ chat_id }: IGetMessages) => {
	return (await db('messages').where({ chat_id }).select('*')) || [];
};

export const createMessage = async ({ sender_id, chat_id, text }: ICreateMessage) => {
	return await db('messages').insert({ sender_id, chat_id, text }).returning('id');
};

export const setMessagesRead = async ({ sender_id, chat_id, admin }: ISetMessagesRead) => {
	if (admin) {
		return await db('messages')
			.where({ chat_id })
			.andWhere('is_read', false)
			.andWhere({ sender_id })
			.update('is_read', true);
	}

	return await db('messages')
		.where({ chat_id })
		.andWhere('is_read', false)
		.whereNot({ sender_id })
		.update('is_read', true);
};

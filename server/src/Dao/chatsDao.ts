import db from '../Database/connection';
import { ICreateChat, IGetChatIdByUserId, IGetChatUserByChatId } from '../Interfaces';

export const getChats = async () => {
	return await db('chats').select('*');
};

export const getChatIdByUserId = async ({ user_id }: IGetChatIdByUserId) => {
	return await db('chats').where({ user_id }).select('id').first();
};

export const createChat = async ({ user_id }: ICreateChat) => {
	return await db('chats').insert({ user_id }).returning('id');
};

export const getChatUserByChatId = async ({ id }: IGetChatUserByChatId) => {
	return await db('chats').where({ id }).select('user_id').first();
};

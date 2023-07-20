import { type IGetChatUserProps, type IGetChatUser, type IGetChats } from 'Interfaces';

import { API } from './API';

export const getChats = async (): Promise<IGetChats> => {
	const response: { data: IGetChats } = await API.get('/chats', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const getChatUser = async ({ userId, chatId }: IGetChatUserProps): Promise<IGetChatUser> => {
	const response: { data: IGetChatUser } = await API.post(
		'/chats/user',
		{ userId, chatId },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

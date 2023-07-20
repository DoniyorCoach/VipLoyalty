import { type IGetChatUserProps, type IGetChatUser } from 'Interfaces';

import { API } from './API';

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

import {
	type ISetMessagesRead,
	type ICreateMessage,
	type IGetMessages,
	type IGetMessagesProps,
	type ICreateMessageProps,
	type ISetMessagesReadProps,
} from 'Interfaces';

import { API } from './API';

export const getMessages = async ({ chat_id }: IGetMessagesProps): Promise<IGetMessages> => {
	const response: { data: IGetMessages } = await API.get('/messages', {
		params: {
			chat_id,
		},
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const createMessage = async ({
	text,
	chat_id,
}: ICreateMessageProps): Promise<ICreateMessage> => {
	const response: { data: ICreateMessage } = await API.post(
		'/messages',
		{ text, chat_id },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

export const setMessagesRead = async ({
	chat_Id,
}: ISetMessagesReadProps): Promise<ISetMessagesRead> => {
	const response: { data: ISetMessagesRead } = await API.post(
		'/messages/read',
		{ chat_Id },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

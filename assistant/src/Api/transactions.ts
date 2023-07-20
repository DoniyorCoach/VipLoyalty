import {
	type ICreateTransaction,
	type IGetTransactionsByAssistant,
	type ICreateTransactionProps,
	type IGetTransactionsByAssistantProps,
} from 'Interfaces';

import { API } from './API';

export const createTransaction = async ({
	amount,
	points,
	cardNumber,
}: ICreateTransactionProps): Promise<ICreateTransaction> => {
	const response: { data: ICreateTransaction } = await API.post(
		'/transactions',
		{ amount, points, cardNumber },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

export const getTransactionsByAssistant = async ({
	page,
}: IGetTransactionsByAssistantProps): Promise<IGetTransactionsByAssistant> => {
	const response: { data: IGetTransactionsByAssistant } = await API.get('/transactions/', {
		params: {
			page,
		},
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

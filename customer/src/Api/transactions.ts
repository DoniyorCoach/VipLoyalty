import {
	type IGetTransactionsByCardNumber,
	type IGetTransactionsByCardNumberProps,
} from 'Interfaces';

import { API } from './API';

export const getTransactionsByCardNumber = async ({
	cardNumber,
	page,
}: IGetTransactionsByCardNumberProps): Promise<IGetTransactionsByCardNumber> => {
	const response: { data: IGetTransactionsByCardNumber } = await API.get(
		`/transactions/${cardNumber}`,
		{
			params: {
				page,
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

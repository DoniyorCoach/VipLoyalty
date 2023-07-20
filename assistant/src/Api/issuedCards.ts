import {
	type IGetAvailableBonusToWithdraw,
	type IGetAvailableBonusToWithdrawProps,
} from 'Interfaces';

import { API } from './API';

export const getAvailableBonusToWithdraw = async ({
	cardNumber,
	amount,
}: IGetAvailableBonusToWithdrawProps): Promise<IGetAvailableBonusToWithdraw> => {
	const response: { data: IGetAvailableBonusToWithdraw } = await API.post(
		'/issuedCards/balance',
		{ cardNumber, amount },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

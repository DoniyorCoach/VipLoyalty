import {
	type ICreateManagerAndBusinessProps,
	type ICreateManagerAndBusiness,
} from 'Interfaces';

import { API } from './API';

export const createManagerAndBusiness = async ({
	email,
	password,
	name,
	phoneNumber,
}: ICreateManagerAndBusinessProps): Promise<ICreateManagerAndBusiness> => {
	const response: { data: ICreateManagerAndBusiness } = await API.post(
		'/managers',
		{ email, password, name, phoneNumber },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

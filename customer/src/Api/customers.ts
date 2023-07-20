import {
	type IUpdateCustomer,
	type IGetCustomer,
	type IRegistration,
	type IRegistrationProps,
	type IUpdateCustomerProps,
} from 'Interfaces';

import { API } from './API';

export const registration = async ({
	email,
	password,
	age,
	gender,
	fio,
}: IRegistrationProps): Promise<IRegistration> => {
	const response: { data: IRegistration } = await API.post('/registration', {
		email,
		password,
		age,
		gender,
		fio,
	});
	return response.data;
};

export const getCustomer = async (): Promise<IGetCustomer> => {
	const response: { data: IGetCustomer } = await API.get('/customers', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const updateCustomer = async ({
	age,
	gender,
	fio,
}: IUpdateCustomerProps): Promise<IUpdateCustomer> => {
	const response: { data: IUpdateCustomer } = await API.put(
		'/customers',
		{ age, gender, fio },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

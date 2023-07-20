import {
	type IUpdateAddress,
	type ICreateAddress,
	type IGetAddresses,
	type IGetAddressesProps,
	type ICreateAddressProps,
	type IUpdateAddressProps,
} from 'Interfaces';

import { API } from './API';

export const getAddresses = async ({ page }: IGetAddressesProps): Promise<IGetAddresses> => {
	const response: { data: IGetAddresses } = await API.get('/addresses', {
		params: {
			page,
		},
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const createAddress = async ({ name }: ICreateAddressProps): Promise<ICreateAddress> => {
	const response: { data: ICreateAddress } = await API.post(
		'/addresses',
		{ name },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

export const updateAddress = async ({ id, name }: IUpdateAddressProps): Promise<IUpdateAddress> => {
	const response: { data: IUpdateAddress } = await API.put(
		'/addresses',
		{ id, name },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

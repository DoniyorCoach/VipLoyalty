import { type IDeleteAddress, type IDeleteAddressProps } from 'Interfaces';

import { API } from './API';

export const deleteAddress = async ({ id }: IDeleteAddressProps): Promise<IDeleteAddress> => {
	const response: { data: IDeleteAddress } = await API.delete('/addresses', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
		data: {
			id,
		},
	});
	return response.data;
};

import { type IDeleteLoyalty, type IDeleteLoyaltyProps } from 'Interfaces';

import { API } from './API';

export const deleteLoyalty = async ({ id }: IDeleteLoyaltyProps): Promise<IDeleteLoyalty> => {
	const response: { data: IDeleteLoyalty } = await API.delete('/loyalties', {
		data: {
			id,
		},
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

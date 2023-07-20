import { type IGetCategories } from 'Interfaces';

import { API } from './API';

export const getCategories = async (): Promise<IGetCategories> => {
	const response: { data: IGetCategories } = await API.get('/categories', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

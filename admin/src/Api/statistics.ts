import { type IGetStatisticsForAdmin } from 'Interfaces';

import { API } from './API';

export const getStatisticsForAdmin = async (): Promise<IGetStatisticsForAdmin> => {
	const response: { data: IGetStatisticsForAdmin } = await API.get('/statistics/admin', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

import { type IGetStatisticsForManager } from 'Interfaces';

import { API } from './API';

export const getStatisticsForManager = async (): Promise<IGetStatisticsForManager> => {
	const response: { data: IGetStatisticsForManager } = await API.get('/statistics/manager', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

import {
	type IGetLoyaltyRecommendations,
	type IGetLoyalties,
	type IGetLoyalty,
	type IGetLoyaltyRecommendationsProps,
	type IGetLoyaltyProps,
} from 'Interfaces';

import { API } from './API';

export const getLoyalties = async (): Promise<IGetLoyalties> => {
	const response: { data: IGetLoyalties } = await API.get('/loyalties', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const getLoyaltyRecommendations = async ({
	id,
}: IGetLoyaltyRecommendationsProps): Promise<IGetLoyaltyRecommendations> => {
	const response: { data: IGetLoyaltyRecommendations } = await API.post(
		'/loyalties/recommendations',
		{ id },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

export const getLoyalty = async ({ id }: IGetLoyaltyProps): Promise<IGetLoyalty> => {
	const response: { data: IGetLoyalty } = await API.get(`/loyalties/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

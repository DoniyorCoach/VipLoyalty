import {
	type ICreateLoyaltyProgram,
	type IUpdateLoyaltyProgram,
	type IGetLoyaltyProgram,
	type ICreateLoyaltyProgramProps,
	type IUpdateLoyaltyProgramProps,
} from 'Interfaces';

import { API } from './API';

export const createLoyaltyProgram = async ({
	name,
	category,
	description,
	image,
	conditions,
	paymentPercent,
	pointsToRubles,
}: ICreateLoyaltyProgramProps): Promise<ICreateLoyaltyProgram> => {
	const response: { data: ICreateLoyaltyProgram } = await API.post(
		'/loyalties/program',
		{ name, category, description, image, conditions, paymentPercent, pointsToRubles },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

export const updateLoyaltyProgram = async ({
	name,
	category,
	description,
	image,
	conditions,
	paymentPercent,
	pointsToRubles,
}: IUpdateLoyaltyProgramProps): Promise<IUpdateLoyaltyProgram> => {
	const response: { data: IUpdateLoyaltyProgram } = await API.put(
		'/loyalties/program',
		{ name, category, description, image, conditions, paymentPercent, pointsToRubles },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

export const getLoyaltyProgram = async (): Promise<IGetLoyaltyProgram> => {
	const response: { data: IGetLoyaltyProgram } = await API.get('/loyalties/program', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

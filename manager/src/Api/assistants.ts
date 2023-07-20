import {
	type IUpdateAssistant,
	type ICreateAssistant,
	type IGetAssistants,
	type IDeleteAssistant,
	type IGetAssistantsProps,
	type ICreateAssistantProps,
	type IUpdateAssistantProps,
	type IDeleteAssistantProps,
} from 'Interfaces';

import { API } from './API';

export const getAssistants = async ({ page }: IGetAssistantsProps): Promise<IGetAssistants> => {
	const response: { data: IGetAssistants } = await API.get('/assistants', {
		params: {
			page,
		},
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const createAssistant = async ({
	fio,
	addressId,
	email,
	password,
}: ICreateAssistantProps): Promise<ICreateAssistant> => {
	const response: { data: ICreateAssistant } = await API.post(
		'/assistants',
		{ fio, addressId, email, password },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

export const updateAssistant = async ({
	fio,
	addressId,
	password,
	email,
}: IUpdateAssistantProps): Promise<IUpdateAssistant> => {
	const response: { data: IUpdateAssistant } = await API.put(
		'/assistants',
		{ fio, addressId, password, email },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

export const deleteAssistant = async ({ id }: IDeleteAssistantProps): Promise<IDeleteAssistant> => {
	const response: { data: IDeleteAssistant } = await API.delete('/assistants', {
		data: {
			id,
		},
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

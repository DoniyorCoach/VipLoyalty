import { type ICreateApplication, type ICreateApplicationProps } from 'Interfaces';

import { API } from './API';

export const createApplication = async (
	application: ICreateApplicationProps,
): Promise<ICreateApplication> => {
	const response: { data: ICreateApplication } = await API.post(
		'/applications',
		{ application },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

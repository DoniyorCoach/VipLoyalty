import {
	type IGetApplication,
	type ICompleteApplication,
	type IGetApplicationProps,
	type ICompleteApplicationProps,
	type IGetApplications,
} from 'Interfaces';

import { API } from './API';

export const getApplication = async ({ id }: IGetApplicationProps): Promise<IGetApplication> => {
	const response: { data: IGetApplication } = await API.get(`/applications/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const getApplications = async (): Promise<IGetApplications> => {
	const response: { data: IGetApplications } = await API.get('/applications', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const completeApplication = async ({
	id,
}: ICompleteApplicationProps): Promise<ICompleteApplication> => {
	const response: { data: ICompleteApplication } = await API.put(
		'/applications',
		{ id },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

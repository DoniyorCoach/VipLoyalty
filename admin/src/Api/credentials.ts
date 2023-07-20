import { type IAuthorization, type IAuthentication, type IAuthorizationProps } from 'Interfaces';

import { API } from './API';

export const authentication = async (): Promise<IAuthentication> => {
	const response: { data: IAuthentication } = await API.get('/authentication', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const authorization = async ({
	email,
	password,
	role,
}: IAuthorizationProps): Promise<IAuthorization> => {
	const response: { data: IAuthorization } = await API.post('/authorization', {
		email,
		password,
		role,
	});
	return response.data;
};

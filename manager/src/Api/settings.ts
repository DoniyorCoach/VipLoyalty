import { type IUpdatePasswordProps, type IUpdatePassword } from 'Interfaces';

import { API } from './API';

export const updatePassword = async ({
	currentPassword,
	changedPassword,
}: IUpdatePasswordProps): Promise<IUpdatePassword> => {
	const response: { data: IUpdatePassword } = await API.put(
		'/settings',
		{ currentPassword, changedPassword },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

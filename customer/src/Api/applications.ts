import {
	type ICreateB2bApplication,
	type ICreateB2bApplicationProps,
} from 'Interfaces';

import { API } from './API';

export const createB2bApplication = async (
	application: ICreateB2bApplicationProps,
): Promise<ICreateB2bApplication> => {
	const response: { data: ICreateB2bApplication } = await API.post('/b2b', { application });
	return response.data;
};

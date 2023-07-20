import db from '../Database/connection';
import { ICreateBusiness } from '../Interfaces';

export const createBusiness = async ({ name, phone_number, manager_id }: ICreateBusiness) => {
	return await db('businesses').insert({ name, phone_number, manager_id }).returning('id');
};

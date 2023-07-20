import db from '../Database/connection';
import {
	ICreateCustomer,
	IGetAccountByEmail,
	IGetAccountById,
	IGetAdminById,
	IGetAssistantById,
	IGetCustomerById,
	IGetManagerById,
	IUpdateAccountByEmail,
	IUpdateAccountById,
	IUpdateCustomerById,
	IUpdateManagerById,
} from '../Interfaces';

export const getAccountById = async ({ id }: IGetAccountById) => {
	return await db('accounts').select('*').where({ id }).andWhere({ deleted: false })
		.first();
};

export const getAccountByEmail = async ({ email, role }: IGetAccountByEmail) => {
	const query = db('accounts').select('*').where({ email }).first();

	if (role) query.andWhere('role', role);
	return await query;
};

export const getCustomerById = async ({ id }: IGetCustomerById) => {
	return await db('customers').select('*').where({ id }).andWhere({ deleted: false })
		.first();
};

export const getAssistantById = async ({ id }: IGetAssistantById) => {
	return await db('assistants').select('*').where({ id }).andWhere({ deleted: false })
		.first();
};

export const getManagerById = async ({ id }: IGetManagerById) => {
	return await db('managers').select('*').where({ id }).andWhere({ deleted: false })
		.first();
};

export const getAdminById = async ({ id }: IGetAdminById) => {
	return await db('admins').select('*').where({ id }).andWhere({ deleted: false })
		.first();
};

export const createCustomer = async ({ age, gender, fio }: ICreateCustomer) => {
	return await db('customers').insert({ age, gender, fio }).returning('id');
};

export const createManager = async () => {
	return await db('managers').insert({}).returning('id');
};

export const updateAccountByEmail = async ({ email, password }: IUpdateAccountByEmail) => {
	return await db('accounts').where({ email }).update({ password }).returning('user_id');
};

export const updateAccountById = async ({ id, password }: IUpdateAccountById) => {
	return await db('accounts').where({ id }).update({ password }).returning('id');
};

export const updateManagerById = async ({ id, business_id }: IUpdateManagerById) => {
	return await db('managers').where({ id }).update({ business_id }).returning('id');
};

export const updateCustomerById = async ({
	id, age, gender, fio,
}: IUpdateCustomerById) => {
	return await db('customers').where({ id }).update({ age, gender, fio }).returning('id');
};

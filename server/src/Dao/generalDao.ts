import db from '../Database/connection';
import {
	ICreateAccount, IDeleteAccount, IDeleteAccounts, IGetRoleId,
} from '../Interfaces';

export const getRoleId = async ({ id }: IGetRoleId) => {
	return await db('accounts').select('user_id').where({ id }).first();
};

export const createAccount = async ({
	email, password, user_id, role,
}: ICreateAccount) => {
	return await db('accounts')
		.insert({
			email,
			password,
			user_id,
			role,
		})
		.returning('id');
};

export const deleteAccount = async ({ user_id }: IDeleteAccount) => {
	return await db('accounts').update({ deleted: true }).where({ user_id }).returning('id');
};

export const deleteAccounts = async ({ user_ids }: IDeleteAccounts) => {
	return await db('accounts')
		.update({ deleted: true })
		.whereIn('user_id', user_ids)
		.returning('id');
};

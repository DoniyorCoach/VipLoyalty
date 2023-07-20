import db from '../Database/connection';
import {
	ICreateAddress,
	IDeleteAddress,
	IGetAddressesByManagerId,
	IUpdateAddress,
} from '../Interfaces';

export const getAddressesByManagerId = async ({ id, offset }: IGetAddressesByManagerId) => {
	const query = db('managers')
		.where('managers.id', id)
		.andWhere('addresses.deleted', false)
		.join('addresses', 'managers.business_id', 'addresses.business_id')
		.select(['addresses.id', 'addresses.name'])
		.orderBy('addresses.created_at', 'desc');

	if (offset !== undefined) query.limit(4).offset(offset);
	return await query;
};

export const createAddress = async ({ name, business_id }: ICreateAddress) => {
	return await db('addresses').insert({ name, business_id }).returning(['id', 'name']);
};

export const updateAddress = async ({ id, name }: IUpdateAddress) => {
	return await db('addresses').where({ id }).update({ name }).returning('id');
};

export const deleteAddress = async ({ id }: IDeleteAddress) => {
	return await db('addresses').where({ id }).update({ deleted: true }).returning('id');
};

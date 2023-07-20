import db from '../Database/connection';
import {
	ICreateAssistant,
	IDeleteAssistant,
	IDeleteAssistants,
	IGetAssistants,
	IUpdateAssistant,
} from '../Interfaces';

export const getAssistants = async ({ businessId, offset }: IGetAssistants) => {
	const query = db('assistants')
		.where('assistants.business_id', businessId)
		.join('addresses', 'assistants.work_address_id', 'addresses.id')
		.join('accounts', 'accounts.user_id', 'assistants.id')
		.andWhere('assistants.deleted', false)
		.select('assistants.id', 'assistants.fio', 'accounts.email', {
			work_address: 'addresses.name',
			work_address_id: 'addresses.id',
		})
		.orderBy('assistants.created_at', 'desc');

	if (offset !== undefined) query.limit(4).offset(offset);
	return await query;
};

export const createAssistant = async ({ fio, work_address_id, business_id }: ICreateAssistant) => {
	return await db('assistants').insert({ fio, work_address_id, business_id }).returning('id');
};

export const updateAssistant = async ({ id, fio, work_address_id }: IUpdateAssistant) => {
	return await db('assistants').where({ id }).update({ fio, work_address_id }).returning('id');
};

export const deleteAssistant = async ({ id }: IDeleteAssistant) => {
	return await db('assistants').update({ deleted: true }).where({ id }).returning('id');
};

export const deleteAssistants = async ({ work_address_id }: IDeleteAssistants) => {
	return await db('assistants')
		.where({ work_address_id })
		.update({ deleted: true })
		.returning('id');
};

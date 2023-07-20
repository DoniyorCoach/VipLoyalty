import db from '../Database/connection';
import {
	IGetAddressesByBusinessId,
	IGetAgeCategoriesByLoyaltyId,
	IGetAgeCategoriesStatistics,
	IGetAssistantsByBusinessId,
	IGetGenderByLoyaltyId,
	IGetGenderStatistics,
	IGetIssuedCardByLoyaltyId,
	IGetIssuedCardStatistics,
} from '../Interfaces';

export const getIssuedCardByLoyaltyId = async ({
	loyalty_id,
	active,
	deleted,
	points,
}: IGetIssuedCardByLoyaltyId) => {
	const query = db('issued_cards').where({ loyalty_id });

	if (deleted !== undefined) query.andWhere({ deleted: true });
	if (active !== undefined) {
		query
			.andWhere({ deleted: false })
			.join('transactions', 'issued_cards.card_number', 'transactions.card_number')
			.select('issued_cards.card_number')
			.groupBy('issued_cards.card_number');
	}
	if (points !== undefined) {
		query.andWhere({ deleted: false }).sum('balance');
	}

	return await query;
};

export const getAddressesByBusinessId = async ({ business_id }: IGetAddressesByBusinessId) => {
	return await db('addresses').where({ business_id }).andWhere({ deleted: false });
};

export const getAssistantsByBusinessId = async ({ business_id }: IGetAssistantsByBusinessId) => {
	return await db('assistants').where({ business_id }).andWhere({ deleted: false });
};

export const getAgeCategoriesByLoyaltyId = async ({
	loyalty_id,
	minAge,
	maxAge,
}: IGetAgeCategoriesByLoyaltyId) => {
	let query = db('issued_cards')
		.where({ loyalty_id })
		.andWhere('issued_cards.deleted', false)
		.join('customers', 'issued_cards.owner_id', 'customers.id');

	if (minAge) query = query.where('customers.age', '>=', minAge);
	if (maxAge) query = query.where('customers.age', '<', maxAge);

	return await query;
};

export const getGenderByLoyaltyId = async ({ loyalty_id, gender }: IGetGenderByLoyaltyId) => {
	return await db('issued_cards')
		.where({ loyalty_id })
		.andWhere('issued_cards.deleted', false)
		.join('customers', 'issued_cards.owner_id', 'customers.id')
		.andWhere('customers.gender', gender);
};

export const getAgeCategoriesStatistics = async ({
	minAge,
	maxAge,
}: IGetAgeCategoriesStatistics) => {
	let query = db('customers').select('id');

	if (minAge) query = query.where('age', '>=', minAge);
	if (maxAge) query = query.where('age', '<', maxAge);

	return await query;
};

export const getGenderStatistics = async ({ gender }: IGetGenderStatistics) => {
	return await db('customers').select('id').where('gender', gender);
};

export const getCustomersStatistics = async () => {
	return await db('customers').select('id');
};

export const getBusinessesStatistics = async () => {
	return await db('businesses').select('id');
};

export const getBusinessesAssistantsStatistics = async () => {
	return await db('accounts').select('id').where('role', 'assistant');
};

export const getIssuedCardStatistics = async ({ active, deleted }: IGetIssuedCardStatistics) => {
	const query = db('issued_cards');

	if (deleted !== undefined) query.where({ deleted: true });
	if (active !== undefined) {
		query
			.andWhere({ deleted: false })
			.join('transactions', 'issued_cards.card_number', 'transactions.card_number')
			.select('issued_cards.card_number')
			.groupBy('issued_cards.card_number');
	}
	return await query;
};

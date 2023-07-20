import db from '../Database/connection';
import {
	ICreateLoyaltyProgram,
	IDeleteLoyalty,
	IGetLoyalties,
	IGetLoyaltyByAssistantId,
	IGetLoyaltyByBusinessId,
	IGetLoyaltyRecommendations,
	IGetLoyaltyWhereNotIn,
	IUpdateLoyaltyProgram,
} from '../Interfaces';

export const getLoyalties = async ({ loyaltiesId }: IGetLoyalties) => {
	return await db('loyalties').select('*').where({ deleted: false }).whereNotIn('id', loyaltiesId);
};

export const getLoyaltyRecommendations = async ({
	id,
	loyaltiesId,
}: IGetLoyaltyRecommendations) => {
	const { category } = await db('loyalties')
		.where({ id })
		.andWhere({ deleted: false })
		.select('category')
		.first();

	return await db('loyalties')
		.select('*')
		.where({ category })
		.andWhere({ deleted: false })
		.whereNotIn('id', [...loyaltiesId, id]);
};

export const getLoyaltyWhereNotIn = async ({ id, loyaltiesId }: IGetLoyaltyWhereNotIn) => {
	return await db('loyalties')
		.select('*')
		.where({ id })
		.andWhere({ deleted: false })
		.whereNotIn('id', loyaltiesId)
		.first();
};

export const getLoyaltyByBusinessId = async ({ business_id }: IGetLoyaltyByBusinessId) => {
	return await db('loyalties')
		.select('*')
		.where({ business_id })
		.andWhere({ deleted: false })
		.first();
};

export const deleteLoyalty = async ({ id }: IDeleteLoyalty) => {
	return await db('loyalties').where({ id }).update({ deleted: true }).returning('id');
};

export const getLoyaltyByAssistantId = async ({ id }: IGetLoyaltyByAssistantId) => {
	return await db('assistants')
		.where('assistants.id', id)
		.andWhere('loyalties.deleted', false)
		.join('loyalties', 'assistants.business_id', 'loyalties.business_id')
		.select(
			'loyalties.id',
			'loyalties.conditions',
			'loyalties.payment_percent',
			'loyalties.points_to_rubles',
		)
		.first();
};

export const createLoyaltyProgram = async ({
	name,
	category,
	description,
	image,
	business_id,
	conditions,
	payment_percent,
	points_to_rubles,
}: ICreateLoyaltyProgram) => {
	return await db('loyalties')
		.insert({
			name,
			category,
			description,
			image,
			business_id,
			conditions,
			payment_percent,
			points_to_rubles,
		})
		.returning('id');
};

export const updateLoyaltyProgram = async ({
	name,
	category,
	description,
	image,
	business_id,
	updated_at,
	conditions,
	payment_percent,
	points_to_rubles,
}: IUpdateLoyaltyProgram) => {
	return await db('loyalties')
		.where({ business_id })
		.update({
			name,
			category,
			description,
			image,
			updated_at,
			conditions,
			payment_percent,
			points_to_rubles,
		})
		.returning('*');
};

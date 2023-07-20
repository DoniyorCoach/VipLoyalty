import db from '../Database/connection';
import {
	ICheckCardBelongsCustomer,
	IDeleteIssuedCard,
	IDeleteIssuedCards,
	IGetIssuedCardBalance,
	IGetIssuedCardByCardNumber,
	IGetIssuedCardById,
	IGetIssuedCardByLoyaltyIdAndOwnerId,
	IGetIssuedCardsByOwnerIdReturnLoyaltiesId,
	IGetIssuedCardsByOwnerIdReturnLoyaltiesImage,
	IIssueCard,
	ISetIssuedCardBalance,
} from '../Interfaces';

export const getIssuedCardByLoyaltyIdAndOwnerId = async ({
	loyalty_id,
	owner_id,
}: IGetIssuedCardByLoyaltyIdAndOwnerId) => {
	return await db('issued_cards')
		.select('*')
		.where({ loyalty_id, owner_id })
		.andWhere({ deleted: false })
		.first();
};

export const checkCardBelongsCustomer = async ({ id, owner_id }: ICheckCardBelongsCustomer) => {
	return await db('issued_cards').where({ id, owner_id }).first();
};

export const getIssuedCardById = async ({ id }: IGetIssuedCardById) => {
	return await db('issued_cards')
		.where('issued_cards.id', id)
		.andWhere('issued_cards.deleted', false)
		.join('loyalties', 'issued_cards.loyalty_id', 'loyalties.id')
		.select([
			'issued_cards.balance',
			'issued_cards.card_number',
			'issued_cards.qrcode',
			'loyalties.image',
			'loyalties.name',
		])
		.first();
};

export const getIssuedCardsByOwnerIdReturnLoyaltiesId = async ({
	id,
}: IGetIssuedCardsByOwnerIdReturnLoyaltiesId) => {
	return await db('issued_cards').select('loyalty_id').where({ owner_id: id });
};

export const getIssuedCardByCardNumber = async ({ card_number }: IGetIssuedCardByCardNumber) => {
	return await db('issued_cards')
		.where({ card_number })
		.andWhere({ deleted: false })
		.select('*')
		.first();
};

export const getIssuedCardsByOwnerIdReturnLoyaltiesImage = async ({
	id,
}: IGetIssuedCardsByOwnerIdReturnLoyaltiesImage) => {
	return await db('issued_cards')
		.where({ owner_id: id })
		.andWhere('issued_cards.deleted', false)
		.join('loyalties', 'issued_cards.loyalty_id', 'loyalties.id')
		.select(['issued_cards.id', 'loyalties.image']);
};

export const issueCard = async (newCard: IIssueCard) => {
	return await db('issued_cards').insert(newCard).returning('id');
};

export const getIssuedCardBalance = async ({ card_number }: IGetIssuedCardBalance) => {
	return await db('issued_cards')
		.where({ card_number })
		.andWhere({ deleted: false })
		.select('balance')
		.first();
};

export const setIssuedCardBalance = async ({ card_number, balance }: ISetIssuedCardBalance) => {
	return await db('issued_cards')
		.where({ card_number })
		.andWhere({ deleted: false })
		.update({ balance })
		.returning('id');
};

export const deleteIssuedCard = async ({ card_number }: IDeleteIssuedCard) => {
	return await db('issued_cards').where({ card_number }).update({ deleted: true }).returning('id');
};

export const deleteIssuedCards = async ({ loyalty_id }: IDeleteIssuedCards) => {
	return await db('issued_cards').where({ loyalty_id }).update({ deleted: true }).returning('id');
};

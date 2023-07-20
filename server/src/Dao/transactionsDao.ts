import db from '../Database/connection';
import {
	ICreateTransaction,
	IGetTransactionsByAssistant,
	IGetTransactionsByCardNumber,
} from '../Interfaces';

export const getTransactionsByCardNumber = async ({
	card_number,
	offset,
}: IGetTransactionsByCardNumber) => {
	const query = db('transactions')
		.where({ card_number })
		.select(['id', 'amount', 'points', 'created_at'])
		.orderBy('created_at', 'desc');

	if (offset !== undefined) query.limit(10).offset(offset);
	return await query;
};

export const getTransactionsByAssistant = async ({
	assistant_id,
	offset,
}: IGetTransactionsByAssistant) => {
	const query = db('transactions')
		.select(['id', 'amount', 'created_at', 'card_number'])
		.where({ assistant_id })
		.orderBy('created_at', 'desc');

	if (offset !== undefined) query.limit(10).offset(offset);
	return await query;
};

export const createTransaction = async ({
	amount,
	card_number,
	points,
	assistant_id,
}: ICreateTransaction) => {
	return await db('transactions')
		.insert({
			amount,
			card_number,
			points,
			assistant_id,
		})
		.returning('id');
};

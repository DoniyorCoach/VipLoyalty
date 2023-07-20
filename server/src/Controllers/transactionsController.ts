import { Request, Response } from 'express';
import {
	createTransaction,
	getTransactionsByAssistant,
	getTransactionsByCardNumber,
} from '../Dao/transactionsDao';
import {
	getIssuedCardBalance,
	getIssuedCardByCardNumber,
	setIssuedCardBalance,
} from '../Dao/issuedCardsDao';
import { IAuthentication } from '../Interfaces';
import calcPoints from '../Helpers/calcPoints';
import rounding from '../Helpers/rounding';
import { getLoyaltyByAssistantId } from '../Dao/loyaltiesDao';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getTransactionsByCardNumberController = async (req: Request, res: Response) => {
	try {
		const { cardNumber } = req.params;
		const { page } = req.query;

		const isExists = await getIssuedCardByCardNumber({ card_number: +cardNumber });
		if (!isExists) {
			res.json({ status: 404, data: 'Данная карта не существует у пользователя' });
			return;
		}

		const transactions = await getTransactionsByCardNumber({ card_number: isExists.card_number });

		if (!page) {
			res.json({ status: 200, data: transactions });
			return;
		}

		const offset = (+page - 1) * 10;
		const paginationTransactions = await getTransactionsByCardNumber({
			card_number: isExists.card_number,
			offset,
		});

		res.json({
			status: 200,
			data: {
				transactions: paginationTransactions,
				totalPages: Math.ceil(transactions.length / 10),
			},
		});
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getTransactionsByAssistantController = async (req: IAuthentication, res: Response) => {
	try {
		const { page } = req.query;
		const transactions = await getTransactionsByAssistant({ assistant_id: req.roleId as string });

		if (!transactions) {
			res.json({
				status: 404,
				data: 'Ошибка при получение транзакции, повторите попытку позже!',
			});
			return;
		}

		if (!page) {
			res.json({ status: 200, data: transactions });
			return;
		}

		const offset = (+page - 1) * 10;
		const paginationTransactions = await getTransactionsByAssistant({
			assistant_id: req.roleId as string,
			offset,
		});

		res.json({
			status: 200,
			data: {
				transactions: paginationTransactions,
				totalPages: Math.ceil(transactions.length / 10),
			},
		});
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const createTransactionController = async (req: IAuthentication, res: Response) => {
	try {
		const { amount, points, cardNumber } = req.body;

		const card = await getIssuedCardByCardNumber({ card_number: cardNumber });
		if (!card) {
			res.json({ status: 404, data: 'Данная карта пользователя не существует' });
			return;
		}

		const { id, conditions, points_to_rubles } = await getLoyaltyByAssistantId({
			id: req.roleId as string,
		});
		if (card.loyalty_id !== id) {
			res.json({
				status: 403,
				data: 'Данный пользователь не является вашим клиентом',
			});
			return;
		}

		const poinstForPurchase = calcPoints(amount, conditions, points_to_rubles);

		const transactionId = await createTransaction({
			amount,
			card_number: cardNumber,
			points: poinstForPurchase,
			assistant_id: req.roleId as string,
		});

		if (!transactionId) {
			res.json({
				status: 500,
				data: 'Ошибка при создание транзакции, повторите попытку позже!',
			});
			return;
		}

		const { balance } = await getIssuedCardBalance({ card_number: cardNumber });
		const newBalance = rounding(balance - points + poinstForPurchase);
		const issuedCardId = await setIssuedCardBalance({
			card_number: cardNumber,
			balance: newBalance,
		});

		if (!issuedCardId) {
			res.json({
				status: 500,
				data: 'Ошибка при изменение баланса карты, повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 200, data: 'Успешно' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

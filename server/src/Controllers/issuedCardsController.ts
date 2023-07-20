import { Response } from 'express';

import QRCode from 'qrcode';
import { IAuthentication } from '../Interfaces';
import {
	checkCardBelongsCustomer,
	deleteIssuedCard,
	getIssuedCardById,
	getIssuedCardByLoyaltyIdAndOwnerId,
	getIssuedCardsByOwnerIdReturnLoyaltiesImage,
	issueCard,
} from '../Dao/issuedCardsDao';
import generateCardNumber from '../Helpers/generateCardNumber';
import Validators from '../Validators/Validators';
import getAvailableBonusToWithdrawService from '../Services/getAvailableBonusToWithdrawService';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getIssuedCardsController = async (req: IAuthentication, res: Response) => {
	try {
		const issuedCards = await getIssuedCardsByOwnerIdReturnLoyaltiesImage({
			id: req.roleId as string,
		});
		res.json({ status: 200, data: issuedCards });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getIssuedCardController = async (req: IAuthentication, res: Response) => {
	try {
		const { id } = req.params;

		const isCustomerCard = await checkCardBelongsCustomer({ id, owner_id: req.roleId as string });
		if (!isCustomerCard) {
			res.json({ status: 403, data: 'Данная карта не принадлежит данному пользователю' });
			return;
		}

		const issuedCard = await getIssuedCardById({ id });
		res.json({ status: 200, data: issuedCard });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const issueCardController = async (req: IAuthentication, res: Response) => {
	try {
		const { id } = req.body;

		const isExistsCard = await getIssuedCardByLoyaltyIdAndOwnerId({
			loyalty_id: id,
			owner_id: req.roleId as string,
		});
		if (isExistsCard) {
			res.json({ status: 403, data: 'Карта лояльности уже выпущена' });
			return;
		}

		const generatedCardNumber = generateCardNumber();
		const qrcode = await QRCode.toDataURL(generatedCardNumber.toString());

		const newCard = {
			card_number: generatedCardNumber,
			loyalty_id: id,
			qrcode,
			owner_id: req.roleId as string,
		};

		const newCardId = await issueCard(newCard);

		res.json({ status: 200, data: newCardId[0] });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getAvailableBonusToWithdrawController = async (
	req: IAuthentication,
	res: Response,
) => {
	try {
		const { cardNumber, amount } = req.body;

		const validation = Validators({ cardNumber, amount });
		if (!validation.cardNumber || !validation.amount) {
			res.json({
				status: 400,
				data: 'Введены невалидные данные!',
			});
			return;
		}

		res.json(await getAvailableBonusToWithdrawService(cardNumber, amount, req.roleId as string));
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const deleteIssuedCardController = async (req: IAuthentication, res: Response) => {
	try {
		const { cardNumber } = req.body;

		const validation = Validators({ cardNumber });
		if (!validation.cardNumber) {
			res.json({
				status: 400,
				data: 'Введены невалидные данные!',
			});
			return;
		}

		const deletedIssuedCard = await deleteIssuedCard({ card_number: cardNumber });
		if (!deletedIssuedCard) {
			res.json({
				status: 500,
				data: 'Ошибка при удаление карты пользователя. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 200, data: 'Успешно' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

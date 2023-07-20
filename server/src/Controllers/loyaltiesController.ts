import { Response } from 'express';
import {
	createLoyaltyProgram,
	deleteLoyalty,
	getLoyalties,
	getLoyaltyByBusinessId,
	getLoyaltyRecommendations,
	getLoyaltyWhereNotIn,
	updateLoyaltyProgram,
} from '../Dao/loyaltiesDao';
import { IAuthentication } from '../Interfaces';
import { deleteIssuedCards, getIssuedCardsByOwnerIdReturnLoyaltiesId } from '../Dao/issuedCardsDao';
import { getAdminById } from '../Dao/credentialsDao';
import { getBusinessIdByManagerId } from '../Dao/differentDao';
import Validators from '../Validators/Validators';
import groupByProperty from '../Helpers/groupByProperty';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getLoyaltiesController = async (req: IAuthentication, res: Response) => {
	try {
		const issuedCards = await getIssuedCardsByOwnerIdReturnLoyaltiesId({
			id: req.roleId as string,
		});
		const loyaltiesId: string[] = issuedCards.map((card) => card.loyalty_id);
		const loyalties = await getLoyalties({ loyaltiesId });
		const groupedLoyalties = groupByProperty(loyalties, 'category');

		res.json({ status: 200, data: groupedLoyalties });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getLoyaltyRecommendationsController = async (req: IAuthentication, res: Response) => {
	try {
		const { id } = req.body;

		const issuedCards = await getIssuedCardsByOwnerIdReturnLoyaltiesId({
			id: req.roleId as string,
		});
		const loyaltiesId: string[] = issuedCards.map((card) => card.loyalty_id);
		const recommendations = await getLoyaltyRecommendations({ id, loyaltiesId });

		res.json({ status: 200, data: recommendations });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getLoyaltyController = async (req: IAuthentication, res: Response) => {
	try {
		const { id } = req.params;

		const issuedCards = await getIssuedCardsByOwnerIdReturnLoyaltiesId({ id });
		const loyaltiesId: string[] = issuedCards.map((card) => card.loyalty_id);

		const loyalty = await getLoyaltyWhereNotIn({ id, loyaltiesId });
		if (!loyalty) {
			res.json({
				status: 404,
				data: 'Программа лояльности не существует или уже выпущена карта лояльности',
			});
			return;
		}

		res.json({ status: 200, data: loyalty });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const deleteLoyaltyController = async (req: IAuthentication, res: Response) => {
	try {
		const { id } = req.body;

		const isAdmin = await getAdminById({ id });
		if (!isAdmin) {
			res.json({
				status: 403,
				data: 'У Вас нет прав доступа к данной информации',
			});
			return;
		}

		const loyalty = await getLoyaltyByBusinessId({ business_id: id });
		if (!loyalty) {
			res.json({
				status: 404,
				data: 'Программа лояльности не существует',
			});
			return;
		}

		const deletedLoyaltyIssuedCards = await deleteIssuedCards({ loyalty_id: loyalty.id });
		if (!deletedLoyaltyIssuedCards) {
			res.json({
				status: 500,
				data: 'Ошибка при удаление выпущенных карт программы лояльности. Повторите попытку позже!',
			});
			return;
		}

		const deletedLoyalty = await deleteLoyalty({ id: loyalty.id });
		if (!deletedLoyalty) {
			res.json({
				status: 500,
				data: 'Ошибка при удаление программы лояльности. Повторите попытку позже!',
			});
			return;
		}

		res.json({
			status: 200,
			data: 'Программа лояльности и выпущенные карты успешно удалены!',
		});
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getLoyaltyProgramController = async (req: IAuthentication, res: Response) => {
	try {
		const { business_id } = await getBusinessIdByManagerId({ id: req.roleId as string });
		const loyalty = await getLoyaltyByBusinessId({ business_id });

		res.json({ status: 200, data: loyalty });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const createLoyaltyProgramController = async (req: IAuthentication, res: Response) => {
	try {
		const { name, description, image, category, conditions, paymentPercent, pointsToRubles } =
			req.body;

		const validation = Validators({
			loyaltyName: name,
			link: image,
			category,
		});

		if (!validation.loyaltyName || !validation.link || !validation.category) {
			res.json({ status: 400, data: 'Введены невалидные данные!' });
			return;
		}

		const { business_id } = await getBusinessIdByManagerId({ id: req.roleId as string });

		const createdLoyaltyProgram = await createLoyaltyProgram({
			name,
			category,
			description,
			image,
			business_id,
			conditions,
			payment_percent: paymentPercent,
			points_to_rubles: pointsToRubles,
		});
		if (!createdLoyaltyProgram) {
			res.json({
				status: 500,
				data: 'Ошибка при создание программы лояльности. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 201, data: 'Создание программы лояльности прошло успешно.' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const updateLoyaltyProgramController = async (req: IAuthentication, res: Response) => {
	try {
		const { name, category, description, image, conditions, paymentPercent, pointsToRubles } =
			req.body;

		const validation = Validators({
			loyaltyName: name,
			category,
			link: image,
		});

		if (!validation.loyaltyName || !validation.link || !validation.category) {
			res.json({ status: 400, data: 'Введены невалидные данные!' });
			return;
		}

		const { business_id } = await getBusinessIdByManagerId({ id: req.roleId as string });

		const updatedLoyaltyPropgram = await updateLoyaltyProgram({
			name,
			category,
			description,
			image,
			business_id,
			updated_at: new Date(),
			conditions,
			payment_percent: paymentPercent,
			points_to_rubles: pointsToRubles,
		});

		if (!updatedLoyaltyPropgram) {
			res.json({
				status: 500,
				data: 'Ошибка при редактирование программы лояльности. Повторите попытку позже!',
			});
			return;
		}

		res.json({
			status: 200,
			data: updatedLoyaltyPropgram[0],
		});
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

import { Response } from 'express';
import { IAuthentication } from '../Interfaces';
import { getAdminById, getManagerById } from '../Dao/credentialsDao';
import { statisticsForManagerService } from '../Services/statisticsForManagerService';
import { getLoyaltyByBusinessId } from '../Dao/loyaltiesDao';
import { statisticsForAdminService } from '../Services/statisticsForAdminService';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getStatisticsForManagerController = async (req: IAuthentication, res: Response) => {
	try {
		const isManager = await getManagerById({ id: req.roleId as string });

		if (!isManager) {
			res.json({
				status: 403,
				data: 'У Вас нет прав доступа к данной информации',
			});
			return;
		}

		const loyalty = await getLoyaltyByBusinessId({ business_id: isManager.business_id });
		if (!loyalty) {
			res.json({
				status: 102,
				data: 'У вас отсутствует программа лояльности, которая предоставляет статистику',
			});
			return;
		}

		res.json(await statisticsForManagerService(loyalty.id, isManager.business_id));
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getStatisticsForAdminController = async (req: IAuthentication, res: Response) => {
	try {
		const isAdmin = await getAdminById({ id: req.roleId as string });

		if (!isAdmin) {
			res.json({
				status: 403,
				data: 'У Вас нет прав доступа к данной информации',
			});
			return;
		}

		res.json(await statisticsForAdminService());
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

import { Request, Response } from 'express';

import Validators from '../Validators/Validators';
import authorizationService from '../Services/authorizationService';
import { IAccount, IAuthentication } from '../Interfaces';
import { getAccountById } from '../Dao/credentialsDao';
import { registrationService } from '../Services/registrationService';
import generateJWT from '../Helpers/generateJWT';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const authorizationController = async (req: Request, res: Response) => {
	try {
		const { email, password, role } = req.body;

		const validation = Validators({ email, password, role });

		if (!validation.email || !validation.password || !validation.role) {
			res.json({
				status: 400,
				data: 'Введены невалидные данные!',
			});
			return;
		}

		res.json(await authorizationService({ email, password, role }));
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const authenticationController = async (req: IAuthentication, res: Response) => {
	try {
		const account: IAccount = await getAccountById({ id: req.accountId as string });

		if (!account) {
			res.json({ status: 404, data: 'Пользователь не найден' });
			return;
		}

		const token = generateJWT(account.id);

		res.json({ status: 200, data: { token, user: { id: account.user_id, role: account.role } } });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const registrationController = async (req: Request, res: Response) => {
	try {
		const validation = Validators(req.body);

		if (
			!validation.email ||
			!validation.password ||
			!validation.gender ||
			!validation.age ||
			!validation.fio
		) {
			res.json({
				status: 400,
				data: 'Введены невалидные данные!',
			});
			return;
		}
		res.json(await registrationService(req.body));
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

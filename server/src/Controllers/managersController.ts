import { Response } from 'express';
import { IAuthentication } from '../Interfaces';
import { getAdminById } from '../Dao/credentialsDao';
import Validators from '../Validators/Validators';
import createManagerAndBusinessService from '../Services/managersService';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const createManagerAndBusinessController = async (req: IAuthentication, res: Response) => {
	try {
		const { email, password, name, phoneNumber } = req.body;

		const validation = Validators({
			email,
			password,
			loyaltyName: name,
			phoneNumber,
		});
		if (
			!validation.email ||
			!validation.password ||
			!validation.loyaltyName ||
			!validation.phoneNumber
		) {
			res.json({
				status: 400,
				data: 'Введены невалидные данные!',
			});
			return;
		}

		const isAdmin = await getAdminById({ id: req.roleId as string });

		if (!isAdmin) {
			res.json({
				status: 403,
				data: 'У Вас нет прав доступа к данной информации',
			});
			return;
		}

		res.json(await createManagerAndBusinessService(email, password, name, phoneNumber));
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

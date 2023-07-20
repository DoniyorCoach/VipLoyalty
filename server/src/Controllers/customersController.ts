import { Response } from 'express';

import { IAuthentication } from '../Interfaces';
import { getCustomerById, updateCustomerById } from '../Dao/credentialsDao';
import Validators from '../Validators/Validators';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getCustomerController = async (req: IAuthentication, res: Response) => {
	try {
		const customer = await getCustomerById({ id: req.roleId as string });
		if (!customer) {
			res.json({
				status: 404,
				data: 'Ошибка при получание клиента. Повторите попытку позже!',
			});
		}

		res.json({ status: 200, data: customer });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const updateCustomerController = async (req: IAuthentication, res: Response) => {
	try {
		const { age, gender, fio } = req.body;

		const validation = Validators({ age, gender, fio });

		if (!validation.age || !validation.gender || !validation.fio) {
			res.json({
				status: 400,
				data: 'Введены невалидные данные!',
			});
			return;
		}

		const updatedCustomer = await updateCustomerById({
			id: req.roleId as string,
			age,
			gender,
			fio,
		});
		if (!updatedCustomer) {
			res.json({
				status: 500,
				data: 'Ошибка при изменение адреса. Повторите попытку позже!',
			});
		}

		res.json({ status: 200, data: 'Данные успешно обновлены' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

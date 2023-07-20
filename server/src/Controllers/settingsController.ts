import { Response } from 'express';

import { IAuthentication } from '../Interfaces';
import Validators from '../Validators/Validators';
import { updatePasswordService } from '../Services/settingsService';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const updatePasswordController = async (req: IAuthentication, res: Response) => {
	try {
		const { currentPassword, changedPassword } = req.body;

		const validation = Validators({ password: currentPassword, secondPassword: changedPassword });
		if (!validation.password || !validation.secondPassword) {
			res.json({
				status: 400,
				data: 'Введены невалидные данные!',
			});
			return;
		}

		res.json(
			await updatePasswordService(currentPassword, changedPassword, req.accountId as string),
		);
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

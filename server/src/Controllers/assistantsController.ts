import { Request, Response } from 'express';

import { IAuthentication } from '../Interfaces';
import Validators from '../Validators/Validators';
import { deleteAssistant, getAssistants } from '../Dao/assistantsDao';
import createAssistantService from '../Services/createAssistantService';
import updateAssistantService from '../Services/updateAssistantService';
import { deleteAccount } from '../Dao/generalDao';
import { getBusinessIdByManagerId } from '../Dao/differentDao';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getAssistantsController = async (req: IAuthentication, res: Response) => {
	try {
		const { page } = req.query;

		const assistantBusiness = await getBusinessIdByManagerId({ id: req.roleId as string });
		const assistants = await getAssistants({ businessId: assistantBusiness.business_id });

		if (!assistants) {
			res.json({
				status: 404,
				data: 'Ошибка при получение сотрудников. Повторите попытку позже!',
			});
			return;
		}

		if (!page) {
			res.json({ status: 200, data: assistants });
			return;
		}

		const offset = (+page - 1) * 4;
		const paginationAssistants = await getAssistants({
			businessId: assistantBusiness.business_id,
			offset,
		});

		res.json({
			status: 200,
			data: {
				assistants: paginationAssistants,
				totalPages: Math.ceil(assistants.length / 4),
			},
		});
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const createAssistantController = async (req: IAuthentication, res: Response) => {
	try {
		const { fio, addressId, password, email } = req.body;

		const validation = Validators({
			fio,
			id: addressId,
			password,
			email,
		});
		if (!validation.fio || !validation.id || !validation.email || !validation.password) {
			res.json({
				status: 400,
				data: 'Введены невалидные данные!',
			});
			return;
		}
		res.json(await createAssistantService(fio, addressId, password, email, req.roleId as string));
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const updateAssistantController = async (req: IAuthentication, res: Response) => {
	try {
		const { fio, addressId, password, email } = req.body;

		const validation = Validators({ fio, id: addressId, password });
		if (!validation.fio || !validation.id || !validation.password) {
			res.json({
				status: 400,
				data: 'Введены невалидные данные!',
			});
			return;
		}
		res.json(await updateAssistantService(fio, addressId, password, email));
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const deleteAssistantController = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;

		const deletedAssistant = await deleteAssistant({ id });
		if (!deletedAssistant) {
			res.json({
				status: 500,
				data: 'Ошибка при удаление сотрудника. Повторите попытку позже!',
			});
			return;
		}

		const deletedAccount = await deleteAccount({ user_id: deletedAssistant[0].id });
		if (!deletedAccount) {
			res.json({
				status: 500,
				data: 'Ошибка при удаление аккаунта сотрудника. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 200, data: 'Успешно' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

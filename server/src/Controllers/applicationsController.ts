import { Request, Response } from 'express';
import { IAuthentication } from '../Interfaces';
import {
	completeApplication,
	createApplication,
	getApplication,
	getApplications,
} from '../Dao/applicationsDao';
import { getAdminById } from '../Dao/credentialsDao';
import { getBusinessIdByAssistantId, getBusinessIdByManagerId } from '../Dao/differentDao';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const createApplicationController = async (req: IAuthentication, res: Response) => {
	try {
		const { application } = req.body;

		let business;

		if (application.user_role === 'manager') {
			business = await getBusinessIdByManagerId({ id: req.roleId as string });
		} else if (application.user_role === 'assistant') {
			business = await getBusinessIdByAssistantId({ id: req.roleId as string });
		}

		const createdApplication = await createApplication({
			name: application.name,
			text: application.text,
			user_role: application.user_role,
			user_id: req.roleId as string,
			business_id: business.business_id,
		});

		if (!createdApplication) {
			res.json({
				status: 500,
				data: 'Ошибка при добавление заявки. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 201, data: 'Ваша заявка успешно отправлена' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const createB2bApplicationController = async (req: Request, res: Response) => {
	try {
		const { application } = req.body;
		const createdApplication = await createApplication({
			name: application.name,
			text: application.text,
			user_role: application.user_role,
		});

		if (!createdApplication) {
			res.json({
				status: 500,
				data: 'Ошибка при добавление заявки. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 201, data: 'Ваша заявка успешно отправлена' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getApplicationController = async (req: IAuthentication, res: Response) => {
	try {
		const isAdmin = await getAdminById({ id: req.roleId as string });

		if (!isAdmin) {
			res.json({
				status: 403,
				data: 'У Вас нет прав доступа к данной информации',
			});
			return;
		}

		const application = await getApplication({ id: req.params.id });

		if (!application) {
			res.json({
				status: 404,
				data: 'При получении заявления произошла ошибка. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 200, data: application });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const getApplicationsController = async (req: IAuthentication, res: Response) => {
	try {
		const isAdmin = await getAdminById({ id: req.roleId as string });

		if (!isAdmin) {
			res.json({
				status: 403,
				data: 'У Вас нет прав доступа к данной информации',
			});
			return;
		}

		const applications = await getApplications();

		if (!applications) {
			res.json({
				status: 404,
				data: 'При получении списка заявлений произошла ошибка. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 200, data: applications.reverse() });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const completeApplicationsController = async (req: IAuthentication, res: Response) => {
	try {
		const { id } = req.body;
		const isAdmin = await getAdminById({ id: req.roleId as string });

		if (!isAdmin) {
			res.json({
				status: 403,
				data: 'У Вас нет прав доступа к данной информации',
			});
			return;
		}

		const application = await completeApplication({ id, updated_at: new Date() });

		if (!application) {
			res.json({
				status: 404,
				data: 'При получении списка заявлений произошла ошибка. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 200, data: 'Успешно завершён!' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

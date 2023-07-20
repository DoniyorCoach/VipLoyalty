import { NextFunction, Response } from 'express';

import { IAuthentication } from '../Interfaces';
import {
	createAddress,
	deleteAddress,
	getAddressesByManagerId,
	updateAddress,
} from '../Dao/addressesDao';
import { getBusinessIdByManagerId } from '../Dao/differentDao';
import { getAdminById } from '../Dao/credentialsDao';
import { deleteAssistants } from '../Dao/assistantsDao';
import { deleteAccounts } from '../Dao/generalDao';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getAddressesController = async (req: IAuthentication, res: Response) => {
	try {
		const { page } = req.query;
		const addresses = await getAddressesByManagerId({ id: req.roleId as string });

		if (!addresses) {
			res.json({
				status: 404,
				data: 'Ошибка при получение адресов. Повторите попытку позже!',
			});
			return;
		}

		if (!page) {
			res.json({ status: 200, data: addresses });
			return;
		}

		const offset = (+page - 1) * 4;
		const paginationAddresses = await getAddressesByManagerId({ id: req.roleId as string, offset });

		res.json({
			status: 200,
			data: {
				addresses: paginationAddresses,
				totalPages: Math.ceil(addresses.length / 4),
			},
		});
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const updateAddressController = async (req: IAuthentication, res: Response) => {
	try {
		const { id, name } = req.body;

		const updatedAddress = await updateAddress({ id, name });
		if (!updatedAddress) {
			res.json({
				status: 500,
				data: 'Ошибка при изменение адреса. Повторите попытку позже!',
			});
		}
		res.json({ status: 200, data: 'Успешно' });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

export const deleteAddressController = async (
	req: IAuthentication,
	res: Response,
	next: NextFunction,
) => {
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

		const deletedAssistants = await deleteAssistants({ work_address_id: id });
		if (!deletedAssistants) {
			res.json({
				status: 500,
				data: 'Ошибка при удаление сотрудников. Повторите попытку позже!',
			});
			return;
		}

		const assistantsId: string[] = deletedAssistants.map((assistant) => assistant.id);
		const deletedAssistantsAccount = await deleteAccounts({ user_ids: assistantsId });
		if (!deletedAssistantsAccount) {
			res.json({
				status: 500,
				data: 'Ошибка при удаление аккаунтов сотрудников. Повторите попытку позже!',
			});
			return;
		}

		const deletedAddress = await deleteAddress({ id });
		if (!deletedAddress) {
			res.json({
				status: 500,
				data: 'Ошибка при удаление адреса. Повторите попытку позже!',
			});
			return;
		}

		res.json({
			status: 200,
			data: 'Удаление адреса магазина и связанных сотрудников прошло успешно.',
		});
	} catch (error) {
		next(error);
	}
};

export const createAddressController = async (req: IAuthentication, res: Response) => {
	try {
		const { name } = req.body;

		const { business_id } = await getBusinessIdByManagerId({ id: req.roleId as string });
		const newAddress = await createAddress({ name, business_id });

		if (!newAddress) {
			res.json({
				status: 500,
				data: 'Ошибка при добавление адреса. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 201, data: newAddress[0] });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

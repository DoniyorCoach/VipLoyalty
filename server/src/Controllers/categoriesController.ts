import { Request, Response } from 'express';
import { getCategories } from '../Dao/categoriesDao';
import loggerMiddleware from '../Middlewares/loggerMiddleware';

export const getCategoriesController = async (req: Request, res: Response) => {
	try {
		const categories = await getCategories();
		if (!categories) {
			res.json({
				status: 500,
				data: 'Ошибка при удаление адреса. Повторите попытку позже!',
			});
			return;
		}

		res.json({ status: 200, data: categories });
	} catch (error) {
		loggerMiddleware(error as Error, res);
	}
};

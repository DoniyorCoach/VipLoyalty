import { Response } from 'express';
import logger from '../Logs';

const loggerMiddleware = (error: Error, res: Response) => {
	logger.error(error);

	res.json({
		status: 500,
		data: 'Ошибка сервера. Повторите попытку позже!',
	});
};

export default loggerMiddleware;

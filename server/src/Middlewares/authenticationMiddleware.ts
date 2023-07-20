import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IAuthentication } from '../Interfaces';
import { getRoleId } from '../Dao/generalDao';

const authenticationMiddleware = async (
	req: IAuthentication,
	res: Response,
	next: NextFunction,
) => {
	if (req.method === 'OPTIONS') return next();

	try {
		const token = req.headers.authorization?.split(' ').pop();

		if (!token) {
			res.json({ status: 401, data: 'Вы не авторизованы!' });
			return false;
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
		const { user_id } = await getRoleId({ id: decoded.id });

		req.roleId = user_id;
		req.accountId = decoded.id;

		next();
	} catch (error) {
		return res.json({ status: 401, data: 'Вы не авторизованы!' });
	}

	// Add a return statement at the end of the function
	return '';
};

export default authenticationMiddleware;

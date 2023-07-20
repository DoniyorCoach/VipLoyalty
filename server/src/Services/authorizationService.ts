import bcrypt from 'bcrypt';

import { IAccount, IAuthorization } from '../Interfaces';
import generateJWT from '../Helpers/generateJWT';
import { getAccountByEmail } from '../Dao/credentialsDao';

const authorizationService = async ({ email, password, role }: IAuthorization) => {
	const account: IAccount = await getAccountByEmail({ email, role });

	if (!account) return { status: 404, data: 'Пользователь не найден!' };
	if (account.deleted) return { status: 410, data: 'Аккаунт был удален!' };

	const isPassEqual = await bcrypt.compare(password, account.password);
	if (!isPassEqual) return { status: 400, data: 'Неверно введен пароль!' };

	const token = generateJWT(account.id);

	return { status: 200, data: { token, user: { id: account.user_id, role: account.role } } };
};

export default authorizationService;

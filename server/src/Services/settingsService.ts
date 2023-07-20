import bcrypt from 'bcrypt';

import { getAccountById, updateAccountById } from '../Dao/credentialsDao';

export const updatePasswordService = async (
	currentPassword: string,
	changedPassword: string,
	id: string,
) => {
	const { password } = await getAccountById({ id });

	const isPassEqual = await bcrypt.compare(currentPassword, password);
	if (!isPassEqual) return { status: 400, data: 'Неверно введен текущий пароль!' };

	const hashedPassword = await bcrypt.hash(changedPassword, 6);
	const updatedAccount = await updateAccountById({ id, password: hashedPassword });

	if (!updatedAccount) {
		return { status: 500, data: 'Ошибка при изменения пароля. Повторите попытку позже!' };
	}

	return { status: 200, data: 'Пароль успешно изменен!' };
};

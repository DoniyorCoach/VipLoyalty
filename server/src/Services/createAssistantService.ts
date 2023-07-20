import bcrypt from 'bcrypt';

import { getAccountByEmail } from '../Dao/credentialsDao';
import { getBusinessIdByManagerId } from '../Dao/differentDao';
import { createAccount } from '../Dao/generalDao';
import { createAssistant } from '../Dao/assistantsDao';

const createAssistantService = async (
	fio: string,
	addressId: string,
	password: string,
	email: string,
	managerId: string,
) => {
	const account = await getAccountByEmail({ email });
	if (account) return { status: 403, data: 'Пользователь с таким email уже существует!' };

	const { business_id } = await getBusinessIdByManagerId({ id: managerId });
	const createdAssistant = await createAssistant({ fio, work_address_id: addressId, business_id });

	if (!createdAssistant) {
		return {
			status: 500,
			data: 'Ошибка при добавление сотрудника. Повторите попытку позже!',
		};
	}

	const hashedPassword = await bcrypt.hash(password, 6);
	const createdAccountId = await createAccount({
		email,
		password: hashedPassword,
		user_id: createdAssistant[0].id,
		role: 'assistant',
	});

	if (!createdAccountId) {
		return {
			status: 500,
			data: 'Ошибка при создание аккаунта. Повторите попытку позже!',
		};
	}

	return { status: 201, data: 'Успешно' };
};

export default createAssistantService;

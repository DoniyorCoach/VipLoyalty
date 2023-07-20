import bcrypt from 'bcrypt';

import { createManager, updateManagerById } from '../Dao/credentialsDao';
import { createBusiness } from '../Dao/businessesDao';
import { createAccount } from '../Dao/generalDao';

const createManagerAndBusinessService = async (
	email: string,
	password: string,
	name: string,
	phoneNumber: string,
) => {
	const createdManager = await createManager();
	if (!createdManager) {
		return { status: 404, data: 'Ошибка при добавление менеджера. Повторите попытку позже!' };
	}

	const hashedPassword = await bcrypt.hash(password, 6);

	const createdAccount = await createAccount({
		email,
		password: hashedPassword,
		user_id: createdManager[0].id,
		role: 'manager',
	});
	if (!createdAccount) {
		return {
			status: 500,
			data: 'Ошибка при создание аккаунта менеджера. Повторите попытку позже!',
		};
	}

	const createdBusiness = await createBusiness({
		name,
		phone_number: phoneNumber,
		manager_id: createdManager[0].id,
	});
	if (!createdBusiness) {
		return { status: 500, data: 'Ошибка при создание бизнеса. Повторите попытку позже!' };
	}

	const updatedManagerBusinessId = await updateManagerById({
		id: createdManager[0].id,
		business_id: createdBusiness[0].id,
	});

	if (!updatedManagerBusinessId) {
		return {
			status: 500,
			data: 'Ошибка при присвоение бизнес ID к менеджеру. Повторите попытку позже!',
		};
	}

	return {
		status: 201,
		data: 'Успешно был создан бизнес, а также назначен менеджер для его управления.',
	};
};

export default createManagerAndBusinessService;

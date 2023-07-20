import bcrypt from 'bcrypt';

import { updateAccountByEmail } from '../Dao/credentialsDao';
import { updateAssistant } from '../Dao/assistantsDao';

const updateAssistantService = async (
	fio: string,
	addressId: string,
	password: string,
	email: string,
) => {
	const hashedPassword = await bcrypt.hash(password, 6);
	const updatedAccount = await updateAccountByEmail({ email, password: hashedPassword });

	if (!updatedAccount[0].user_id) {
		return {
			status: 500,
			data: 'Ошибка при обновление аккаунта сотрудника. Повторите попытку позже!',
		};
	}

	const updatedAssistant = await updateAssistant({
		id: updatedAccount[0].user_id,
		fio,
		work_address_id: addressId,
	});

	if (!updatedAssistant) {
		return {
			status: 500,
			data: 'Ошибка при обновление информации о сотруднике. Повторите попытку позже!',
		};
	}

	return { status: 200, data: 'Успешно' };
};

export default updateAssistantService;

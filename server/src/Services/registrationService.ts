import bcrypt from 'bcrypt';

import { IAccount, IRegistration } from '../Interfaces';
import generateJWT from '../Helpers/generateJWT';
import { createCustomer, getAccountByEmail } from '../Dao/credentialsDao';
import { createAccount } from '../Dao/generalDao';

export const registrationService = async ({ email, password, gender, age, fio }: IRegistration) => {
	const account: IAccount = await getAccountByEmail({ email });
	if (account) return { status: 403, data: 'Пользователь с таким email уже существует!' };

	const hashedPassword = await bcrypt.hash(password, 6);

	const createdCustomer = (await createCustomer({ age, gender, fio }))[0];
	const createdAccount = (
		await createAccount({
			email,
			password: hashedPassword,
			user_id: createdCustomer.id,
			role: 'customer',
		})
	)[0];

	const token = generateJWT(createdAccount.id);

	return {
		status: 201,
		data: { token, user: { role: 'customer', id: createdCustomer.id } },
	};
};

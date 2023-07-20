import validator from 'validator';
import { matchIsValidTel } from 'mui-tel-input';

import { type IValidatorsProps, type IValidatorsResponse } from 'Interfaces';
import { validatePassword } from './Regex';

const Validators = ({
	email,
	password,
	age,
	phoneNumber,
	name,
	fio,
}: IValidatorsProps): IValidatorsResponse => {
	const response: IValidatorsResponse = {};

	if (email !== undefined) {
		response.email = validator.isEmail(email) && validator.isLength(email, { min: 8, max: 40 });
	}

	if (password !== undefined) {
		response.password = validatePassword(password) && validator.isLength(password, { min: 6, max: 30 });
	}

	if (age !== undefined) {
		response.age = age >= 14 && age <= 99;
	}

	if (phoneNumber !== undefined) {
		response.phoneNumber = matchIsValidTel(phoneNumber);
	}

	if (name !== undefined) {
		response.name = validator.isLength(name, { min: 3, max: 30 });
	}

	if (fio !== undefined) {
		response.fio = validator.isLength(fio, { min: 6, max: 60 });
	}

	return response;
};

export default Validators;

import validator from 'validator';
import { matchIsValidTel } from 'mui-tel-input';

import { type IValidatorsProps, type IValidatorsResponse } from 'Interfaces';
import { validatePassword } from './Regex';

const Validators = ({
	email,
	password,
	phoneNumber,
	cardNumber,
	loyaltyName,
	id,
}: IValidatorsProps): IValidatorsResponse => {
	const response: IValidatorsResponse = {};

	if (email !== undefined) {
		response.email = validator.isEmail(email) && validator.isLength(email, { min: 8, max: 40 });
	}

	if (password !== undefined) {
		response.password = validatePassword(password) && validator.isLength(password, { min: 6, max: 30 });
	}

	if (phoneNumber !== undefined) {
		response.phoneNumber = matchIsValidTel(phoneNumber);
	}

	if (cardNumber !== undefined) {
		response.cardNumber = cardNumber.split(' ').join('').length === 16;
	}

	if (loyaltyName !== undefined) {
		response.loyaltyName = validator.isLength(loyaltyName, { min: 2, max: 100 });
	}

	if (id !== undefined) {
		response.id = validator.isUUID(id, 4);
	}

	return response;
};

export default Validators;

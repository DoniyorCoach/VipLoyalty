import validator from 'validator';

import { type IValidatorsProps, type IValidatorsResponse } from 'Interfaces';
import { validatePassword, validatePercent } from './Regex';

const Validators = ({
	email,
	password,
	cardNumber,
	amount,
	percent,
	points,
}: IValidatorsProps): IValidatorsResponse => {
	const response: IValidatorsResponse = {};

	if (email !== undefined) {
		response.email = validator.isEmail(email) && validator.isLength(email, { min: 8, max: 40 });
	}

	if (password !== undefined) {
		response.password = validatePassword(password) && validator.isLength(password, { min: 6, max: 30 });
	}

	if (cardNumber !== undefined) {
		response.cardNumber = cardNumber.split(' ').join('').length === 16;
	}

	if (amount !== undefined) {
		const amountToNumeric = Number(amount.split(' ').join(''));
		response.amount = amountToNumeric >= 1 && amountToNumeric < 100000000;
	}

	if (percent !== undefined) {
		response.percent = validatePercent(percent);
	}

	if (points !== undefined) {
		response.points = Number(points) > 0 && Number(points) < 11;
	}

	return response;
};

export default Validators;

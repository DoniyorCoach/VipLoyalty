import validator from 'validator';

import { type IValidatorsProps, type IValidatorsResponse } from 'Interfaces';
import { validateLink, validatePassword, validatePercent } from './Regex';

const Validators = ({
	email,
	password,
	secondPassword,
	name,
	amount,
	address,
	fio,
	loyaltyName,
	file,
	id,
	link,
	category,
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

	if (secondPassword !== undefined) {
		response.secondPassword = validatePassword(secondPassword) && validator.isLength(secondPassword, { min: 6, max: 30 });
	}

	if (name !== undefined) {
		response.name = validator.isLength(name, { min: 3, max: 30 });
	}

	if (amount !== undefined) {
		const amountToNumeric = Number(amount.split(' ').join(''));
		response.amount = amountToNumeric >= 1 && amountToNumeric < 100000000;
	}

	if (address !== undefined) {
		response.address = validator.isLength(address, { min: 5, max: 50 });
	}

	if (fio !== undefined) {
		response.fio = validator.isLength(fio, { min: 6, max: 60 });
	}

	if (loyaltyName !== undefined) {
		response.loyaltyName = validator.isLength(loyaltyName, { min: 2, max: 100 });
	}

	if (file !== undefined) {
		response.file = file.size < 9437184;
	}

	if (id !== undefined) {
		response.id = validator.isUUID(id, 4);
	}

	if (link !== undefined) {
		response.link = validateLink(link);
	}

	if (category !== undefined) {
		response.category = validator.isLength(category, { min: 2 });
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

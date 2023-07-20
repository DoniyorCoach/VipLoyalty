import validator from 'validator';
import { phone } from 'phone';

import { IValidatorsProps, IValidatorsResponse } from '../Interfaces';
import { validateLink, validatePassword } from './Regex';

const Validators = ({
	email,
	password,
	secondPassword,
	age,
	phoneNumber,
	name,
	cardNumber,
	amount,
	address,
	fio,
	loyaltyDescription,
	loyaltyName,
	file,
	id,
	gender,
	link,
	category,
	role,
}: IValidatorsProps): IValidatorsResponse => {
	const response: IValidatorsResponse = {};

	if (email !== undefined) {
		response.email = validator.isEmail(email) && validator.isLength(email, { min: 8, max: 40 });
	}
	if (password !== undefined) {
		response.password =
			validatePassword(password) && validator.isLength(password, { min: 6, max: 30 });
	}
	if (secondPassword !== undefined) {
		response.secondPassword =
			validatePassword(secondPassword) && validator.isLength(secondPassword, { min: 6, max: 30 });
	}
	if (age !== undefined) response.age = age >= 14 && age <= 99;
	if (phoneNumber !== undefined) response.phoneNumber = phone(phoneNumber).isValid;
	if (name !== undefined) response.name = validator.isLength(name, { min: 3, max: 30 });
	if (cardNumber !== undefined) response.cardNumber = cardNumber.toString().length === 16;
	if (amount !== undefined) {
		response.amount = amount >= 1 && amount < 100000000;
	}
	if (address !== undefined) response.address = validator.isLength(address, { min: 5, max: 50 });
	if (fio !== undefined) response.fio = validator.isLength(fio, { min: 6, max: 60 });
	if (loyaltyDescription !== undefined) {
		response.loyaltyDescription = validator.isLength(loyaltyDescription, { min: 15, max: 800 });
	}
	if (loyaltyName !== undefined) {
		response.loyaltyName = validator.isLength(loyaltyName, { min: 2, max: 100 });
	}
	if (file !== undefined) response.file = file.size < 9437184;
	if (id !== undefined) response.id = validator.isUUID(id, 4);
	if (gender !== undefined) response.gender = gender === 0 || gender === 1;
	if (link !== undefined) response.link = validateLink(link);
	if (category !== undefined) response.category = validator.isLength(category, { min: 2 });
	if (role !== undefined) {
		response.role = ['customer', 'assistant', 'manager', 'admin', 'anonym'].includes(role);
	}
	return response;
};

export default Validators;

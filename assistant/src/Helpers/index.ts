import moment from 'moment';
import 'moment/locale/ru';

export const formatToNumber = (value: string) => Number(value.split(' ').join(''));

export const formatCardNumber = (value: string) => {
	const format = value.replace(/[^0-9]/g, '').match(/.{1,4}/g);
	const formattedValue = format ? format.join(' ') : '';
	return formattedValue;
};

export const formatAmount = (value: string | number) => {
	let amount = value;

	if (typeof amount === 'number') {
		amount = amount.toString();
	}

	const numericValue = amount.replace(/[^0-9.]/g, '').split('.');

	let formattedValue = '';
	if (numericValue[0] !== undefined) {
		formattedValue = numericValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}

	if (numericValue[1] !== undefined) {
		formattedValue += `.${numericValue[1]}`;
	}

	return formattedValue;
};

export const hideCardNumber = (cardNumber: number) => '************' + cardNumber.toString().slice(-4);

export const formatDate = (date: string) => {
	if (Number(date.slice(0, 4)) === new Date().getFullYear()) {
		return moment(date).format('D MMMM, HH:mm');
	}

	return moment(date).format('D MMMM YYYY, HH:mm');
};

export const spaceToDash = (value: string) => value.split(' ').join('-');

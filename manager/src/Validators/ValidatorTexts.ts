const ValidatorTexts = {
	email: 'Некорректный email-адрес или длина за пределами диапазона от 8 до 40 символов',
	password: 'Пароль должен состоять из латинских букв и быть в диапазоне от 6 до 30 символов',
	amount: 'Сумма покупки за пределами диапозона от 1 до 99 999 999 ₽',
	address: 'Длина адреса за пределами диапазона от 5 до 50 символов',
	fio: 'Длина ФИО за пределами диапазона от 6 до 60 символов',
	loyaltyName: 'Длина название за пределами диапазона от 2 до 100 символов',
	loyaltyDescription: 'Длина описание за пределами диапазона от 15 до 800 символов',
	file: 'Файл не загружен или превышает лимит в 9 МБ.',
	id: 'Некорректный ID',
	persent: 'Процент за пределами диапозона от 1 до 100',
	points: 'Количество баллов за пределами диапозона от 1 до 10',

	userNotFound: 'Пользователь не найден!',
	wrongPassword: 'Неверно введен пароль!',
};

export default ValidatorTexts;
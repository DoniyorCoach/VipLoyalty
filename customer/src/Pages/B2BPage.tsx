import { useState, type ChangeEvent, type FC } from 'react';
import { Button, TextField, Typography, Stack } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';

import { EmailField, Snackbar } from 'Components';
import { createB2bApplication } from 'Api/applications';
import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';
import 'Assets/Styles/Pages/B2BPage.scss';

const B2BPage: FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [website, setWebsite] = useState('');
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleWebsite = (e: ChangeEvent<HTMLInputElement>) => {
		setWebsite(e.target.value);
	};

	const handleSubmit = async () => {
		const validation = Validators({ email, phoneNumber, name });

		if (!validation.email || !validation.name || !validation.phoneNumber) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const application = {
			name: 'Заявка на добавление нового бизнеса',
			text: `<p>Имя: <b>${name}</b>.</p><p>Email: <b>${email}</b>.</p><p>Номер телефона: <b>${phoneNumber}</b>.</p><p>Website: <b>${website}</b>.</p>`,
			user_role: 'anonym',
		};

		const { status, data } = await createB2bApplication(application);
		if (status !== 201) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setName('');
		setEmail('');
		setPhoneNumber('');
		setWebsite('');
		setSnackbar({ text: data, variant: 'success' });
	};

	return (
		<Stack spacing={3} className="b2bPage">
			<Typography component="h1" variant="h5" align="center">
				Подключите вашу компанию к VipLoyalty
			</Typography>
			<Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
				Мы помогаем налаживать коммуникацию с покупателями и привлекать активную и платёжеспособную
				аудиторию.
			</Typography>
			<Stack width={{ xs: '80%', md: '50%' }} spacing={3}>
				<TextField
					label="Введите ваше имя"
					autoFocus
					required
					value={name}
					onChange={handleName}
					error={validate.name === false}
					helperText={validate.name === false && ValidatorTexts.name}
				/>
				<EmailField
					variant="outlined"
					label="Адрес электронной почты"
					email={email}
					setEmail={setEmail}
					error={validate.email}
				/>
				<MuiTelInput
					label="Номер телефона"
					onlyCountries={['UZ', 'RU', 'KZ', 'UA', 'BY', 'KG', 'TJ']}
					defaultCountry="RU"
					required
					value={phoneNumber}
					onChange={setPhoneNumber}
					error={validate.phoneNumber === false}
					helperText={validate.phoneNumber === false && ValidatorTexts.phoneNumber}
				/>
				<TextField label="Сайт вашей компании" value={website} onChange={handleWebsite} />
				<Button variant="outlined" onClick={handleSubmit}>
					Отправить
				</Button>
				{snackbar && (
					<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
				)}
			</Stack>
		</Stack>
	);
};

export default B2BPage;

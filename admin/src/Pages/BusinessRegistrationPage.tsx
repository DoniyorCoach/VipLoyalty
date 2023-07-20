import { type ChangeEvent, useState, type FC } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';

import { EmailField, PasswordField, Snackbar } from 'Components';
import { createManagerAndBusiness } from 'Api/managers';
import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';

const BusinessRegistrationPage: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSubmit = async () => {
		const validation = Validators({
			email,
			password,
			loyaltyName: name,
			phoneNumber,
		});

		if (
			!validation.email || !validation.password || !validation.loyaltyName || !validation.phoneNumber
		) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await createManagerAndBusiness({ email, password, name, phoneNumber });
		if (status !== 201) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setEmail('');
		setPassword('');
		setName('');
		setPhoneNumber('');
		setSnackbar({ text: data, variant: 'success' });
	};

	return (
		<Stack spacing={3}>
			<Typography align="center" variant="h6">
				Регистрация бизнеса
			</Typography>
			<TextField
				label="Название компании"
				variant="standard"
				required
				autoFocus
				value={name}
				onChange={handleName}
				error={validate.loyaltyName === false}
				helperText={validate.loyaltyName === false && ValidatorTexts.loyaltyName}
			/>
			<EmailField variant="standard" email={email} setEmail={setEmail} error={validate.email} />
			<PasswordField
				variant="standard"
				password={password}
				setPassword={setPassword}
				error={validate.password}
			/>
			<MuiTelInput
				label="Номер телефона"
				onlyCountries={['UZ', 'RU', 'KZ', 'UA', 'BY']}
				defaultCountry="RU"
				required
				variant="standard"
				value={phoneNumber}
				onChange={setPhoneNumber}
				error={validate.phoneNumber === false}
				helperText={validate.phoneNumber === false && ValidatorTexts.phoneNumber}
			/>
			<Button onClick={handleSubmit} variant="contained">
				зарегистрировать
			</Button>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default BusinessRegistrationPage;

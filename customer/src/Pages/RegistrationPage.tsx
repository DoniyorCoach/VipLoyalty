import { type ChangeEvent, useState, type FC } from 'react';
import {
	Button,
	TextField,
	RadioGroup,
	FormControlLabel,
	Radio,
	Stack,
	Typography,
} from '@mui/material';
import { LockOpenOutlined, GroupAdd } from '@mui/icons-material';

import { EmailField, PasswordField, Snackbar } from 'Components';
import { userStore } from 'Store';
import { registration } from 'Api/customers';
import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';
import 'Assets/Styles/Pages/RegistrationPage.scss';

const RegistrationPage: FC = () => {
	const [fio, setFio] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [age, setAge] = useState<number>(0);
	const [gender, setGender] = useState(0);
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleSubmit = async () => {
		const validation = Validators({
			email,
			password,
			age,
			fio,
		});

		if (!validation.age || !validation.email || !validation.password || !validation.fio) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await registration({ email, password, age, gender, fio });
		if (status !== 201) {
			setSnackbar({ text: data as string, variant: 'error' });
			return;
		}

		if (typeof data === 'object' && 'user' in data) {
			localStorage.setItem('token', data.token);
			userStore.setIsAuth(true, data.user);
		}
	};

	const handleAge = (e: ChangeEvent<HTMLInputElement>) => {
		setAge(Number(e.target.value));
	};

	const handleGender = (e: ChangeEvent<HTMLInputElement>) => {
		setGender(Number(e.target.value));
	};

	const handleFio = (e: ChangeEvent<HTMLInputElement>) => {
		setFio(e.target.value);
	};

	return (
		<>
			<LockOpenOutlined color="primary" fontSize="large" className="registrationPage__avatar" />
			<Stack spacing={3}>
				<TextField
					label="ФИО"
					autoFocus
					required
					size="small"
					value={fio}
					onChange={handleFio}
					error={validate.fio === false}
					helperText={validate.fio === false && ValidatorTexts.fio}
				/>
				<EmailField variant="outlined" email={email} setEmail={setEmail} error={validate.email} />
				<PasswordField
					variant="outlined"
					password={password}
					setPassword={setPassword}
					error={validate.password}
				/>
				<TextField
					type="number"
					label="Возраст"
					variant="outlined"
					required
					value={age === 0 ? '' : age}
					onChange={handleAge}
					error={validate.age === false}
					helperText={validate.age === false && ValidatorTexts.age}
				/>
				<RadioGroup row value={gender} onChange={handleGender}>
					<FormControlLabel value={1} control={<Radio />} label="женский" />
					<FormControlLabel value={0} control={<Radio />} label="мужской" />
				</RadioGroup>
				<Button
					variant="contained"
					className="registrationPage__btn"
					startIcon={<GroupAdd />}
					onClick={handleSubmit}
				>
					Создать аккаунт
				</Button>
				<Typography className="registrationPage__footer" color="text.secondary">
					© VipLoyalty 2023
				</Typography>
			</Stack>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</>
	);
};

export default RegistrationPage;

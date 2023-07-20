import { type ChangeEvent, useEffect, useState, type FC } from 'react';
import {
	Button,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Snackbar, ThemeSwitcher } from 'Components';
import socket from 'Sockets';
import { userStore } from 'Store';

import { getCustomer, updateCustomer } from 'Api/customers';

import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';
import 'Assets/Styles/Pages/SettingsPage.scss';

const SettingsPage: FC = () => {
	const [fio, setFio] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState<number>(0);
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleLogout = () => {
		userStore.logout();
	};

	const handleAge = (e: ChangeEvent<HTMLInputElement>) => {
		setAge(e.target.value);
	};

	const handleGender = (e: ChangeEvent<HTMLInputElement>) => {
		setGender(Number(e.target.value));
	};

	const handleFio = (e: ChangeEvent<HTMLInputElement>) => {
		setFio(e.target.value);
	};

	const handleSubmit = async () => {
		const validation = Validators({
			age: Number(age),
			fio,
		});

		if (!validation.age || !validation.fio) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await updateCustomer({ age: Number(age), gender, fio });
		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setSnackbar({ text: data, variant: 'success' });
	};

	useEffect(() => {
		(async () => {
			const { status, data } = await getCustomer();

			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			if (typeof data === 'object' && 'age' in data) {
				setAge(data.age.toString());
				setGender(data.gender);
				setFio(data.fio);
				setLoading(false);
			}
		})();

		socket.on('receiver_message', () => {
			setReload(!reload);
		});
	}, [reload]);

	return loading ? (
		<LoadingPage />
	) : (
		<Stack
			width={{ xs: '100%', md: '60%', lg: '50%' }}
			spacing={5}
			className="customerSettingsPage"
		>
			<Stack spacing={3}>
				<Typography align="center" variant="h6">
					Общие настройки
				</Typography>
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
				<TextField
					type="number"
					label="Возраст"
					variant="standard"
					required
					value={age}
					onChange={handleAge}
					error={validate.age === false}
					helperText={validate.age === false && ValidatorTexts.age}
				/>
				<RadioGroup row value={gender ?? 0} onChange={handleGender}>
					<FormControlLabel value={1} control={<Radio />} label="женский" />
					<FormControlLabel value={0} control={<Radio />} label="мужской" />
				</RadioGroup>
				<Button onClick={handleSubmit} variant="outlined">
					Сохранить
				</Button>
			</Stack>
			<ThemeSwitcher />
			<Button color="error" onClick={handleLogout} variant="contained">
				Выйти с аккаунта
			</Button>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default SettingsPage;

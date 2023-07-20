import { type FC, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { PasswordField, Snackbar, ThemeSwitcher } from 'Components';
import { updatePassword } from 'Api/settings';
import { userStore } from 'Store';
import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { Validators } from 'Validators';
import 'Assets/Styles/Pages/SettingsPage.scss';

import ApplicationsPage from './ApplicationsPage';

const SettingsPage: FC = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [changedPassword, setChangedPassword] = useState('');
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleSubmit = async () => {
		const validation = Validators({ password: currentPassword, secondPassword: changedPassword });

		if (!validation.password || !validation.secondPassword) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await updatePassword({ currentPassword, changedPassword });
		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setSnackbar({ text: data, variant: 'success' });
		setChangedPassword('');
		setCurrentPassword('');
	};

	const handleLogout = () => {
		userStore.logout();
	};

	return (
		<Stack spacing={4} width={{ xs: '100%', md: '60%', lg: '50%' }} className="settingsPage">
			<Typography variant="h6" align="center">
				Общие настройки
			</Typography>
			<Stack spacing={3} flex={1}>
				<PasswordField
					label="Текущий пароль"
					variant="outlined"
					size="small"
					password={currentPassword}
					setPassword={setCurrentPassword}
					error={validate.password}
				/>
				<PasswordField
					label="Новый пароль"
					variant="outlined"
					size="small"
					password={changedPassword}
					setPassword={setChangedPassword}
					error={validate.password}
				/>
				<Button variant="outlined" onClick={handleSubmit} size="small">
					Сохранить
				</Button>
			</Stack>
			<ThemeSwitcher />
			<Stack flex={1} justifyContent="center">
				<ApplicationsPage />
			</Stack>
			<Button color="error" onClick={handleLogout}>
				Выйти с аккаунта
			</Button>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default SettingsPage;

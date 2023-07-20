import { type FC, useState } from 'react';
import { Button, Typography, Stack } from '@mui/material';
import { LockOutlined, Login } from '@mui/icons-material';

import { EmailField, PasswordField, Snackbar } from 'Components';
import { userStore } from 'Store';
import { authorization } from 'Api/credentials';
import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { Validators } from 'Validators';
import 'Assets/Styles/Pages/AuthorizationPage.scss';

const AuthorizationPage: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleSubmit = async () => {
		const validation = Validators({ email, password });

		if (!validation.email || !validation.password) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await authorization({ email, password, role: 'customer' });
		if (status !== 200) {
			setSnackbar({ text: data as string, variant: 'error' });
			return;
		}

		if (typeof data === 'object' && 'user' in data) {
			localStorage.setItem('token', data.token);
			userStore.setIsAuth(true, data.user);
		}
	};

	return (
		<>
			<LockOutlined color="secondary" fontSize="large" className="authorizationPage__avatar" />
			<Stack spacing={3}>
				<EmailField variant="outlined" email={email} setEmail={setEmail} error={validate.email} />
				<PasswordField
					variant="outlined"
					password={password}
					setPassword={setPassword}
					error={validate.password}
				/>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleSubmit}
					className="authorizationPage__btn"
					startIcon={<Login />}
				>
					войти в аккаунт
				</Button>
				<Typography className="authorizationPage__footer" color="text.secondary">
					© VipLoyalty 2023
				</Typography>
			</Stack>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</>
	);
};

export default AuthorizationPage;

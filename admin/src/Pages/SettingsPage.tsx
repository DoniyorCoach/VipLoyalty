import { type FC } from 'react';
import { Button, Stack } from '@mui/material';

import { ThemeSwitcher } from 'Components';
import { userStore } from 'Store';

const SettingsPage: FC = () => {
	const handleLogout = () => {
		userStore.logout();
	};

	return (
		<Stack width={{ xs: '100%', md: '60%', lg: '50%' }} margin={'30px auto'} spacing={5}>
			<ThemeSwitcher />
			<Button color="error" onClick={handleLogout}>
				Выйти с аккаунта
			</Button>
		</Stack>
	);
};

export default SettingsPage;

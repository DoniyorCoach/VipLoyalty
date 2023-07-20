import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppBar, Typography, Stack, IconButton } from '@mui/material';
import { SettingsSuggest, Loyalty } from '@mui/icons-material';

import { userStore } from 'Store';
import 'Assets/Styles/Components/Navbar.scss';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar: FC = () => {
	const navigate = useNavigate();

	return (
		<AppBar position="sticky" color="inherit">
			<Stack direction="row" className="navbar">
				<Loyalty
					onClick={() => {
						navigate('/');
					}}
					sx={{ cursor: 'pointer' }}
				/>
				<Typography variant="subtitle2" className="navbar__name" fontWeight="bold">
					Vip Loyalty
				</Typography>
				{userStore.isAuth ? (
					<IconButton
						color="inherit"
						onClick={() => {
							navigate('/settings');
						}}
					>
						<SettingsSuggest />
					</IconButton>
				) : (
					<ThemeSwitcher lite />
				)}
			</Stack>
		</AppBar>
	);
};

export default observer(Navbar);

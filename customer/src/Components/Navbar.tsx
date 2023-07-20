import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppBar, Typography, Stack, Button, IconButton } from '@mui/material';
import { SettingsSuggest, CallMade, Loyalty } from '@mui/icons-material';

import { userStore } from 'Store';
import 'Assets/Styles/Components/Navbar.scss';

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
					<Button
						onClick={() => {
							navigate('/b2b');
						}}
						endIcon={<CallMade />}
					>
						Для бизнеса
					</Button>
				)}
			</Stack>
		</AppBar>
	);
};

export default observer(Navbar);

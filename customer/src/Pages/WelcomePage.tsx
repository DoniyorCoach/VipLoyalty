import { type FC, useState } from 'react';
import { Box, Button, ButtonGroup, Stack, Typography } from '@mui/material';

import { Modal, Navbar } from 'Components';
import 'Assets/Styles/Pages/WelcomePage.scss';

import AuthorizationPage from './AuthorizationPage';
import RegistrationPage from './RegistrationPage';

const WelcomePage: FC = () => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(0);

	const handleClick = (selected: number) => {
		setSelected(selected);
		setOpen(true);
	};

	return (
		<>
			<Navbar />
			<Stack
				direction={{ md: 'row' }}
				m={5}
				justifyContent={{ xs: 'center', md: 'space-between' }}
				className="welcomePage"
			>
				<Stack spacing={3} flex={0.45}>
					<Typography color="secondary" variant="h3">
						Web приложение, с которым покупают выгодно!
					</Typography>
					<ButtonGroup variant="outlined" color="secondary">
						<Button
							onClick={() => {
								handleClick(0);
							}}
						>
							Авторизация
						</Button>
						<Button
							onClick={() => {
								handleClick(1);
							}}
						>
							Регистрация
						</Button>
					</ButtonGroup>
				</Stack>
				<Stack flex={0.5}>
					<Box
						component="img"
						src="https://cdni.iconscout.com/illustration/premium/thumb/customer-loyalty-program-6471121-5349350.png"
					/>
				</Stack>
			</Stack>
			<Modal open={open} onClose={setOpen}>
				{selected === 0 ? <AuthorizationPage /> : <RegistrationPage />}
			</Modal>
		</>
	);
};

export default WelcomePage;

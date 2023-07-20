import { type ChangeEvent, useEffect, useState, type FC } from 'react';
import {
	Button,
	DialogActions,
	DialogContentText,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
	Stack,
	TextField,
} from '@mui/material';

import { Modal, Snackbar } from 'Components';

import { createApplication } from 'Api/applications';
import { getAddresses } from 'Api/addresses';

import { type IAddress, type ISnackbar } from 'Interfaces';

const ApplicationsPage: FC = () => {
	const [dialog, setDialog] = useState(false);
	const [selectedApp, setSelectedApp] = useState<number>();
	const [address, setAddress] = useState<IAddress>();
	const [addresses, setAddresses] = useState<IAddress[]>([]);
	const [cardNumber, setCardNumber] = useState('');
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleDialog = () => {
		setDialog(!dialog);
	};

	const handleApp = (app: number) => {
		setSelectedApp(app);
		handleDialog();
	};

	const handleAddress = (e: SelectChangeEvent) => {
		const selectedAddressId = e.target.value;
		setAddress(addresses.find((address) => address.id === selectedAddressId));
	};

	const handleCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
		setCardNumber(e.target.value);
	};

	const handleSendApp = async () => {
		handleDialog();

		const application = {
			name: '',
			text: '',
			user_role: 'manager',
		};

		if (selectedApp === 0) {
			application.name = 'Заявка на удаление программу лояльности';
			application.text = 'Прошу удалить программу лояльности';
		}

		if (selectedApp === 1 && address === undefined) {
			return;
		}

		if (selectedApp === 1) {
			application.name = 'Заявка на удаление магазина';
			application.text = `<p>Прошу удалить магазин по адресу ${address?.name ?? ''}.</p>
      <p>ID адреса: ${address?.id ?? ''}</p>`;
		}

		if (selectedApp === 2) {
			application.name = 'Заявка на удаление карту пользователя';
			application.text = `Прошу удалить карту пользователя ${cardNumber}.`;
		}

		const { status, data } = await createApplication(application);
		if (status !== 201) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setSnackbar({ text: data, variant: 'success' });
		setAddress(undefined);
	};

	useEffect(() => {
		(async () => {
			const { status, data } = await getAddresses({});

			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			setAddresses(data as IAddress[]);
		})();
	}, []);

	return (
		<>
			<Stack spacing={1}>
				<Button
					color="secondary"
					size="small"
					onClick={() => {
						handleApp(0);
					}}
				>
					Оставить заявку на удаление программу лояльности
				</Button>
				<Button
					color="secondary"
					size="small"
					onClick={() => {
						handleApp(1);
					}}
				>
					Оставить заявку на удаление определенного магазина
				</Button>
				<Button
					color="secondary"
					size="small"
					onClick={() => {
						handleApp(2);
					}}
				>
					Оставить заявку на удаление карту пользователя
				</Button>
			</Stack>
			<Modal open={dialog} onClose={handleDialog}>
				{selectedApp === 0 && (
					<DialogContentText>
						Вы действительно хотите отправить заявку на удаление программу лояльности?
					</DialogContentText>
				)}
				{selectedApp === 1 && (
					<FormControl required>
						<InputLabel id="select">Адрес магазина</InputLabel>
						<Select
							label="Адрес магазина"
							labelId="select"
							value={address ? address.id : ''}
							onChange={handleAddress}
						>
							{addresses.map((address) => (
								<MenuItem key={address.id} value={address.id}>
									{address.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
				{selectedApp === 2 && (
					<TextField
						label="Номер карты пользователя"
						autoFocus
						required
						value={cardNumber}
						onChange={handleCardNumber}
					/>
				)}
				<DialogActions>
					<Button onClick={handleDialog}>Отменить</Button>
					<Button onClick={handleSendApp}>Отправить</Button>
				</DialogActions>
			</Modal>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</>
	);
};

export default ApplicationsPage;

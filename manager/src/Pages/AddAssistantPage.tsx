import { type ChangeEvent, useEffect, useState, type FC } from 'react';

import {
	Button,
	TextField,
	Typography,
	MenuItem,
	Select,
	type SelectChangeEvent,
	InputLabel,
	FormControl,
} from '@mui/material';

import { EmailField, PasswordField, Snackbar } from 'Components';

import { getAddresses } from 'Api/addresses';
import { createAssistant } from 'Api/assistants';

import {
	type IAddAssistantPageProps,
	type IAddress,
	type ISnackbar,
	type IValidatorsResponse,
} from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';

const AddAssistantPage: FC<IAddAssistantPageProps> = ({ reloadPage, setReloadPage }) => {
	const [fio, setFio] = useState('');
	const [addresses, setAddresses] = useState<IAddress[]>([]);
	const [addressId, setAddressId] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setFio(e.target.value);
	};

	const handleAddress = (e: SelectChangeEvent) => {
		setAddressId(e.target.value);
	};

	const handleSubmit = async () => {
		const validation = Validators({ fio, email, password, id: addressId });

		if (!validation.fio || !validation.email || !validation.password || !validation.id) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await createAssistant({ fio, addressId, email, password });
		if (status !== 201) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setFio('');
		setEmail('');
		setPassword('');
		setAddressId('');
		setSnackbar({ text: data, variant: 'success' });
		setReloadPage(!reloadPage);
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
			<Typography component="h2" variant="h5" align="center">
				Добавление сотрудника
			</Typography>
			<TextField
				label="ФИО"
				autoFocus
				required
				size="small"
				value={fio}
				onChange={handleName}
				error={validate.fio === false}
				helperText={validate.fio === false && ValidatorTexts.fio}
			/>
			<FormControl required error={validate.id === false}>
				<InputLabel id="select">Место работы</InputLabel>
				<Select label="Место работы" labelId="select" value={addressId} onChange={handleAddress}>
					{addresses.map((address) => (
						<MenuItem key={address.id} value={address.id}>
							{address.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<EmailField
				variant="outlined"
				size="small"
				email={email}
				setEmail={setEmail}
				error={validate.email}
			/>
			<PasswordField
				variant="outlined"
				size="small"
				password={password}
				setPassword={setPassword}
				error={validate.password}
			/>
			<Button variant="contained" onClick={handleSubmit}>
				Добавить
			</Button>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</>
	);
};

export default AddAssistantPage;

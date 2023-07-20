import { type ChangeEvent, useEffect, useState, type FC } from 'react';

import {
	Button,
	FormControl,
	InputLabel,
	TextField,
	Typography,
	Select,
	MenuItem,
	type SelectChangeEvent,
} from '@mui/material';

import { EmailField, PasswordField, Snackbar } from 'Components';

import { getAddresses } from 'Api/addresses';
import { updateAssistant } from 'Api/assistants';

import {
	type IAddress,
	type ISnackbar,
	type IUpdateAssistantPageProps,
	type IValidatorsResponse,
} from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';

const UpdateAssistantPage: FC<IUpdateAssistantPageProps> = ({
	selectedAssistant,
	setReloadPage,
	reloadPage,
}) => {
	const [fio, setFio] = useState<string>(selectedAssistant.fio);
	const [addressId, setAddressId] = useState<string>(selectedAssistant.work_address_id);
	const [password, setPassword] = useState<string>('');
	const [addresses, setAddresses] = useState<IAddress[]>([]);
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setFio(e.target.value);
	};

	const handleAddress = (e: SelectChangeEvent) => {
		setAddressId(e.target.value);
	};

	const handleSubmit = async () => {
		const validation = Validators({ fio, password, id: addressId });

		if (!validation.fio || !validation.password || !validation.id) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await updateAssistant({
			fio,
			addressId,
			password,
			email: selectedAssistant.email,
		});
		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

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
			<Typography component="h2" variant="h6" align="center">
				Редактирование сотрудника
			</Typography>
			<TextField
				label="ФИО"
				size="small"
				autoFocus
				required
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
				email={selectedAssistant.email}
				size="small"
				error={validate.email}
				disabled
			/>
			<PasswordField
				variant="outlined"
				size="small"
				password={password}
				setPassword={setPassword}
				error={validate.password}
			/>
			<Button variant="contained" onClick={handleSubmit}>
				Сохранить
			</Button>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</>
	);
};

export default UpdateAssistantPage;

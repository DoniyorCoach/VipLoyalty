import { type ChangeEvent, useState, type FC } from 'react';
import { Button, TextField, Typography } from '@mui/material';

import { Snackbar } from 'Components';
import { updateAddress } from 'Api/addresses';
import { type ISnackbar, type IUpdateAddressPageProps } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';

const UpdateAddressPage: FC<IUpdateAddressPageProps> = ({
	selectedAddress,
	setReloadPage,
	reloadPage,
}) => {
	const [name, setName] = useState(selectedAddress.name);
	const [validate, setValidate] = useState(true);
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSubmit = async () => {
		if (!Validators({ name }).address) {
			setValidate(false);
			return;
		}

		setValidate(true);

		const { status, data } = await updateAddress({ id: selectedAddress.id, name });

		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setSnackbar({ text: data, variant: 'success' });
		setReloadPage(!reloadPage);
	};

	return (
		<>
			<Typography component="h2" variant="h6" align="center">
				Редактирование адреса
			</Typography>
			<TextField
				label="Адрес магазина"
				autoFocus
				required
				value={name}
				onChange={handleName}
				error={!validate}
				helperText={!validate && ValidatorTexts.address}
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

export default UpdateAddressPage;

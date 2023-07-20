import { type ChangeEvent, useState, type FC } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

import { Snackbar } from 'Components';
import { deleteAddress } from 'Api/addresses';
import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';

const DeleteAddressPage: FC = () => {
	const [id, setId] = useState('');
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleId = (e: ChangeEvent<HTMLInputElement>) => {
		setId(e.target.value);
	};

	const handleSubmit = async () => {
		const validation = Validators({
			id,
		});

		if (!validation.id) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { data, status } = await deleteAddress({ id });
		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setSnackbar({ text: data, variant: 'success' });
		setId('');
	};

	return (
		<Stack spacing={7}>
			<Stack spacing={3}>
				<Typography align="center" variant="h6">
					Удаление адреса магазина
				</Typography>
				<TextField
					label="ID адреса"
					autoFocus
					required
					value={id}
					onChange={handleId}
					error={validate.id === false}
					helperText={validate.id === false && ValidatorTexts.id}
				/>
				<Button onClick={handleSubmit} color="error" variant="contained">
					Удалить
				</Button>
			</Stack>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default DeleteAddressPage;

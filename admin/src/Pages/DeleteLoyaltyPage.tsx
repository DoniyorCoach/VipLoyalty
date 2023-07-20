import { type ChangeEvent, useState, type FC } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

import { Snackbar } from 'Components';
import { deleteLoyalty } from 'Api/loyalties';
import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';

const DeleteLoyaltyPage: FC = () => {
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

		const { status, data } = await deleteLoyalty({ id });
		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setId('');
		setSnackbar({ text: data, variant: 'success' });
	};

	return (
		<Stack spacing={3}>
			<Typography align="center" variant="h6">
				Удаление программы лояльности бизнеса
			</Typography>
			<TextField
				label="ID бизнеса"
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
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default DeleteLoyaltyPage;

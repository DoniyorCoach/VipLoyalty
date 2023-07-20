import { type ChangeEvent, useState, type FC } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

import { Snackbar } from 'Components';
import { deleteIssuedCard } from 'Api/issuedCards';
import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';

const DeleteCardPage: FC = () => {
	const [cardNumber, setCardNumber] = useState('');
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
		setCardNumber(e.target.value);
	};

	const handleSubmit = async () => {
		const validation = Validators({
			cardNumber,
		});

		if (!validation.cardNumber) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await deleteIssuedCard({ cardNumber: Number(cardNumber) });
		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setSnackbar({ text: data, variant: 'success' });
		setCardNumber('');
	};

	return (
		<Stack spacing={7}>
			<Stack spacing={3}>
				<Typography align="center" variant="h6">
					Удаление карты пользователя
				</Typography>
				<TextField
					label="Номер карты"
					autoFocus
					required
					value={cardNumber}
					onChange={handleCardNumber}
					error={validate.cardNumber === false}
					helperText={validate.cardNumber === false && ValidatorTexts.cardNumber}
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

export default DeleteCardPage;

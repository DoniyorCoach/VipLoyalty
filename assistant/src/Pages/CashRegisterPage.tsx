import { type ChangeEvent, useState, type FC } from 'react';
import {
	Button,
	InputAdornment,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	TextField,
	Typography,
	Switch,
} from '@mui/material';
import { CreditCard, CurrencyRuble, PointOfSale, Payments } from '@mui/icons-material';

import { Snackbar } from 'Components';

import { getAvailableBonusToWithdraw } from 'Api/issuedCards';
import { createTransaction } from 'Api/transactions';

import { formatAmount, formatCardNumber, formatToNumber } from 'Helpers';
import colors from 'Assets/colors';
import { type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';
import 'Assets/Styles/Pages/CashRegisterPage.scss';

const CashRegisterPage: FC = () => {
	const [cardNumber, setCardNumber] = useState('');
	const [purchaseAmount, setPurchaseAmount] = useState('');
	const [payableAmount, setPayableAmount] = useState('');
	const [checked, setChecked] = useState(false);
	const [points, setPoints] = useState(0);
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [validate, setValidate] = useState<IValidatorsResponse>({});

	const handleCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
		if (checked) {
			setChecked(false);
		} // Кассир, когда выбрал списать баллы, но потом решил изменить данные или обхитрить)

		setCardNumber(formatCardNumber(e.target.value));
	};

	const handlePurchaseAmount = (e: ChangeEvent<HTMLInputElement>) => {
		if (checked) {
			setChecked(false);
		}

		setPurchaseAmount(formatAmount(e.target.value));
		setPayableAmount(formatAmount(e.target.value));
	};

	const handleChecked = async () => {
		if (checked) {
			setPoints(0);
			setPayableAmount(purchaseAmount);

			setChecked(false);
			return;
		}

		const validation = Validators({ cardNumber, amount: purchaseAmount });
		if (!validation.cardNumber || !validation.amount) {
			setSnackbar({
				text: 'Чтобы списать баллы укажите карту покупателя и сумму покупки',
				variant: 'warning',
			});
			return;
		}

		const { status, data } = await getAvailableBonusToWithdraw({
			cardNumber: formatToNumber(cardNumber),
			amount: formatToNumber(purchaseAmount),
		});

		if (status !== 200) {
			setSnackbar({ text: data as string, variant: 'error' });
			return;
		}

		if (typeof data === 'object' && 'points' in data) {
			setChecked(true);
			setPayableAmount(formatAmount(data.payableAmount));
			setPoints(data.points);
		}
	};

	const handleSubmit = async () => {
		const validation = Validators({ cardNumber, amount: purchaseAmount });

		if (!validation.cardNumber || !validation.amount) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await createTransaction({
			amount: formatToNumber(payableAmount),
			points,
			cardNumber: formatToNumber(cardNumber),
		});

		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setCardNumber('');
		setPurchaseAmount('');
		setPayableAmount('');
		setChecked(false);
		setPoints(0);
		setSnackbar({ text: data, variant: 'success' });
	};

	return (
		<Stack spacing={7} width={{ xs: '100%', md: '70%', lg: '50%' }} className="cashRegisterPage">
			<Stack spacing={3}>
				<PointOfSale className="cashRegisterPage__avatar" fontSize="large" />
				<TextField
					label="Номер карты покупателя"
					autoFocus
					value={cardNumber}
					onChange={handleCardNumber}
					inputProps={{
						maxLength: 19,
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<CreditCard />
							</InputAdornment>
						),
					}}
					error={validate?.cardNumber === false}
					helperText={validate?.cardNumber === false && ValidatorTexts.cardNumber}
				/>
				<TextField
					label="Cумма покупки"
					value={purchaseAmount}
					onChange={handlePurchaseAmount}
					inputProps={{
						maxLength: 13,
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<CurrencyRuble />
							</InputAdornment>
						),
					}}
					error={validate?.amount === false}
					helperText={validate?.amount === false && ValidatorTexts.amount}
				/>
			</Stack>
			<Stack spacing={4}>
				<Stack direction="row" justifyContent="space-between">
					<Typography fontWeight="bold" color="text.secondary">
						Списать баллы
					</Typography>
					<Switch checked={checked} onChange={handleChecked} />
				</Stack>
				<ListItem disableGutters disablePadding>
					<ListItemIcon>
						<Payments />
					</ListItemIcon>
					<ListItemText primary="Cумма к оплате" />
					<Typography color={colors.success} variant="h6">
						{payableAmount && `${payableAmount} ₽`}
					</Typography>
				</ListItem>
			</Stack>
			<Button variant="contained" onClick={handleSubmit}>
				Создать
			</Button>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default CashRegisterPage;

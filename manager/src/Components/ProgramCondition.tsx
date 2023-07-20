import { type FC } from 'react';
import { CurrencyRuble, Percent } from '@mui/icons-material';
import { InputAdornment, Stack, TextField } from '@mui/material';

import { type IProgramConditionComponentProps } from 'Interfaces';
import { ValidatorTexts } from 'Validators';

const ProgramCondition: FC<IProgramConditionComponentProps> = ({
	persent,
	amount,
	setPersent,
	setAmount,
	firstLabel,
	secondLabel,
	persentError,
	amountError,
	firstAvatar,
	secondAvatar,
	firstErrorText,
	secondErrorText,
}) => (
	<Stack spacing={3} direction="row">
		<TextField
			fullWidth
			label={firstLabel ? firstLabel : 'Cкидка на чек'}
			value={persent}
			onChange={(e) => {
				setPersent(e.target.value);
			}}
			variant="standard"
			size="small"
			required
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">{firstAvatar ? firstAvatar : <Percent />}</InputAdornment>
				),
			}}
			error={persentError === false}
			helperText={
				persentError === false && (firstErrorText ? firstErrorText : ValidatorTexts.persent)
			}
		/>
		<TextField
			fullWidth
			label={secondLabel ? secondLabel : 'При покупке от'}
			value={amount}
			onChange={(e) => {
				setAmount(e.target.value);
			}}
			variant="standard"
			size="small"
			required
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						{secondAvatar ? secondAvatar : <CurrencyRuble />}
					</InputAdornment>
				),
			}}
			error={amountError === false}
			helperText={
				amountError === false && (secondErrorText ? secondErrorText : ValidatorTexts.amount)
			}
		/>
	</Stack>
);

export default ProgramCondition;

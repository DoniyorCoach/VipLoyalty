import { type FC, type ChangeEvent } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { AlternateEmail } from '@mui/icons-material';

import { type IEmailFieldComponentProps } from 'Interfaces';
import ValidatorTexts from 'Validators/ValidatorTexts';

const EmailField: FC<IEmailFieldComponentProps> = ({
	variant,
	size,
	label,
	email,
	setEmail,
	error,
	disabled,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (setEmail) {
			setEmail(e.target.value);
		}
	};

	return (
		<TextField
			type="email"
			label={label ? label : 'Email'}
			value={email}
			onChange={handleChange}
			variant={variant}
			size={size}
			disabled={disabled}
			required
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton>
							<AlternateEmail />
						</IconButton>
					</InputAdornment>
				),
			}}
			error={error === false}
			helperText={error === false && ValidatorTexts.email}
		/>
	);
};

export default EmailField;

import { type ChangeEvent, useState, type FC } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { type IPasswordFieldComponentProps } from 'Interfaces';
import ValidatorTexts from 'Validators/ValidatorTexts';

const PasswordField: FC<IPasswordFieldComponentProps> = ({
	variant,
	size,
	label,
	password,
	setPassword,
	error,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<TextField
			type={showPassword ? 'text' : 'password'}
			label={label ? label : 'Пароль'}
			value={password}
			onChange={handleChange}
			variant={variant}
			size={size}
			required
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClickShowPassword}>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
			error={error === false}
			helperText={error === false && ValidatorTexts.password}
		/>
	);
};

export default PasswordField;

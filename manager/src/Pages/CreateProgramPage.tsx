import { type ChangeEvent, useState, type FC } from 'react';
import ReactQuill from 'react-quill';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';

import { Snackbar, Uploader } from 'Components';
import { createLoyaltyProgram } from 'Api/loyalties';
import { type ICreateProgramPageProps, type ISnackbar, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';
import 'react-quill/dist/quill.snow.css';

import ProgramSettingsPage from './ProgramSettingsPage';

const CreateProgramPage: FC<ICreateProgramPageProps> = ({ setReloadPage, categories }) => {
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [uploadedLink, setUploadedLink] = useState('');
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [conditions, setConditions] = useState<Record<string, string>>();
	const [paymentPercent, setPaymentPercent] = useState('');
	const [pointsToRubles, setPointsToRubles] = useState('');
	const [settingsValidate, setSettingsValidate] = useState(false);

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleCategory = (e: SelectChangeEvent) => {
		setCategory(e.target.value);
	};

	const handleSubmit = async () => {
		const validation = Validators({ loyaltyName: name, link: uploadedLink, category });

		if (
			!validation.loyaltyName || !validation.link || !validation.category || !settingsValidate || !conditions
		) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await createLoyaltyProgram({
			name,
			category,
			description,
			image: uploadedLink,
			conditions,
			paymentPercent: Number(paymentPercent),
			pointsToRubles: Number(pointsToRubles),
		});
		if (status !== 201) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setReloadPage(true);
	};

	return (
		<>
			<Typography component="h2" variant="h6" align="center">
				Создание программы лояльности
			</Typography>
			<TextField
				label="Название"
				autoFocus
				required
				value={name}
				onChange={handleName}
				error={validate.loyaltyName === false}
				helperText={validate?.loyaltyName === false && ValidatorTexts.loyaltyName}
			/>
			<FormControl required error={validate.category === false}>
				<InputLabel id="select">Категории программы</InputLabel>
				<Select
					label="Категории программы"
					labelId="select"
					value={category}
					onChange={handleCategory}
				>
					{categories.map((category) => (
						<MenuItem key={category.id} value={category.name}>
							{category.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<ReactQuill
				className="editor"
				placeholder="Описание"
				value={description}
				onChange={setDescription}
			/>
			<ProgramSettingsPage
				setConditions={setConditions}
				setSettingsValidate={setSettingsValidate}
				setPaymentPercent={setPaymentPercent}
				setPointsToRubles={setPointsToRubles}
			/>
			<Box>
				<Uploader link={uploadedLink} setLink={setUploadedLink} />
				{validate.link === false && (
					<Typography color="error" variant="subtitle2" align="center">
						{ValidatorTexts.file}
					</Typography>
				)}
			</Box>
			<Button variant="contained" onClick={handleSubmit}>
				Создать
			</Button>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</>
	);
};

export default CreateProgramPage;

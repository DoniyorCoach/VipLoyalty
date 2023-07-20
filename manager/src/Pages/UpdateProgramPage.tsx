import { type ChangeEvent, useState, type FC } from 'react';
import ReactQuill from 'react-quill';
import {
	Button,
	TextField,
	Typography,
	Stack,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from '@mui/material';

import { Snackbar, Uploader } from 'Components';
import { updateLoyaltyProgram } from 'Api/loyalties';
import { formatDate } from 'Helpers';
import {
	type IProgram,
	type ISnackbar,
	type IUpdateProgramPageProps,
	type IValidatorsResponse,
} from 'Interfaces';
import { Validators, ValidatorTexts } from 'Validators';
import 'react-quill/dist/quill.snow.css';
import ProgramSettingsPage from './ProgramSettingsPage';

const UpdateProgramPage: FC<IUpdateProgramPageProps> = ({ program, setProgram, categories }) => {
	const [name, setName] = useState(program.name);
	const [uploadedLink, setUploadedLink] = useState(program.image);
	const [description, setDescription] = useState(program.description);
	const [category, setCategory] = useState(program.category);
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [validate, setValidate] = useState<IValidatorsResponse>({});
	const [conditions, setConditions] = useState<Record<string, string>>(program.conditions);
	const [paymentPercent, setPaymentPercent] = useState(program.payment_percent);
	const [pointsToRubles, setPointsToRubles] = useState(program.points_to_rubles);
	const [settingsValidate, setSettingsValidate] = useState(false);

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleCategory = (e: SelectChangeEvent) => {
		setCategory(e.target.value);
	};

	const handleSubmit = async () => {
		const validation = Validators({ loyaltyName: name, category, link: uploadedLink });

		if (!validation.loyaltyName || !validation.link || !validation.category || !settingsValidate) {
			setValidate(validation);
			return;
		}

		setValidate({});

		const { status, data } = await updateLoyaltyProgram({
			name,
			category,
			description,
			image: uploadedLink,
			conditions,
			paymentPercent: Number(paymentPercent),
			pointsToRubles: Number(pointsToRubles),
		});
		if (status !== 200) {
			setSnackbar({ text: data as string, variant: 'error' });
			return;
		}

		setProgram(data as IProgram);
		setSnackbar({
			text: 'Редактирование программы лояльности прошло успешно.',
			variant: 'success',
		});
	};

	return (
		<Stack spacing={6}>
			<Stack spacing={3}>
				<Typography component="h2" variant="h6" align="center">
					Редактирование программы лояльности
				</Typography>
				<TextField
					label="Название"
					autoFocus
					required
					value={name}
					onChange={handleName}
					error={validate.loyaltyName === false}
					helperText={validate.loyaltyName === false && ValidatorTexts.loyaltyName}
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
				<ReactQuill className="editor" theme="snow" value={description} onChange={setDescription} />
				<ProgramSettingsPage
					conditions={conditions}
					setConditions={setConditions}
					setSettingsValidate={setSettingsValidate}
					setPaymentPercent={setPaymentPercent}
					setPointsToRubles={setPointsToRubles}
					paymentPercent={paymentPercent}
					pointsToRubles={pointsToRubles}
				/>
				<Uploader link={uploadedLink} setLink={setUploadedLink} />
				{validate.link === false && (
					<Typography color="error" variant="subtitle2" align="center">
						{ValidatorTexts.file}
					</Typography>
				)}
				<Button variant="contained" onClick={handleSubmit}>
					Сохранить
				</Button>
			</Stack>
			<Stack spacing={1}>
				<Typography color="text.secondary">
					Дата создания: {formatDate(program.created_at)}
				</Typography>
				<Typography color="text.secondary">
					Последнее обновление: {formatDate(program.updated_at)}
				</Typography>
				{snackbar && (
					<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
				)}
			</Stack>
		</Stack>
	);
};

export default UpdateProgramPage;

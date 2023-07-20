import { type FC, useEffect, useState } from 'react';
import { Stack } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Snackbar } from 'Components';

import { getLoyaltyProgram } from 'Api/loyalties';
import { getCategories } from 'Api/categories';

import { type ICategory, type IProgram, type ISnackbar } from 'Interfaces';
import 'Assets/Styles/Pages/ProgramsPage.scss';

import CreateProgramPage from './CreateProgramPage';
import UpdateProgramPage from './UpdateProgramPage';

const ProgramsPage: FC = () => {
	const [program, setProgram] = useState<IProgram>();
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [reload, setReloadPage] = useState(false);
	const [loading, setLoading] = useState(true);
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	useEffect(() => {
		(async () => {
			const loyaltyProgram = await getLoyaltyProgram();

			if (loyaltyProgram.status !== 200) {
				setSnackbar({ text: loyaltyProgram.data as string, variant: 'error' });
				return;
			}

			setProgram(loyaltyProgram.data as IProgram);

			const categories = await getCategories();
			if (categories.status !== 200) {
				setSnackbar({ text: categories.data as string, variant: 'error' });
				return;
			}

			setCategories(categories.data as ICategory[]);
			setLoading(false);

			if (reload) {
				setSnackbar({ text: 'Создание программы лояльности прошло успешно.', variant: 'success' });
			}
		})();
	}, [reload]);

	return loading ? (
		<LoadingPage />
	) : (
		<Stack spacing={3} width={{ md: '85%' }} className="programsPage">
			{!program && <CreateProgramPage setReloadPage={setReloadPage} categories={categories} />}
			{program && (
				<UpdateProgramPage program={program} setProgram={setProgram} categories={categories} />
			)}
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default ProgramsPage;

import { type FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import { Button, Stack, Typography } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Snackbar } from 'Components';
import { completeApplication, getApplication } from 'Api/applications';
import { formatDate } from 'Helpers';
import colors from 'Assets/colors';
import { type IApplication, type ISnackbar } from 'Interfaces';
import 'Assets/Styles/Pages/ApplicationPage.scss';

const ApplicationPage: FC = () => {
	const [application, setApplication] = useState<IApplication>();
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [completed, setCompleted] = useState(false);

	const location = useLocation();

	useEffect(() => {
		const applicationId = location.pathname.split('/').pop();

		(async () => {
			if (!applicationId) {
				return;
			}

			const { status, data } = await getApplication({ id: applicationId });

			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			setApplication(data as IApplication);
		})();
	}, [location]);

	const handleClick = async () => {
		if (!application) {
			return;
		}

		const { status, data } = await completeApplication({ id: application.id });
		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setCompleted(true);
	};

	return application ? (
		<Stack width={{ md: '80%' }} spacing={4} className="applicationPage">
			<Typography align="center" variant="h6">
				{application.name}
			</Typography>
			<Stack spacing={1}>
				<Typography color="text.secondary">От кого: {application.user_role}</Typography>
				{application.user_id && (
					<Typography color="text.secondary">ID юзера: {application.user_id}</Typography>
				)}
				{application.business_id && (
					<Typography color="text.secondary">ID бизнеса: {application.business_id}</Typography>
				)}
				<Typography color="text.secondary">
					Дата обращения: {formatDate(application.created_at)}
				</Typography>
			</Stack>
			<Typography className="applicationPage__text">{parse(application.text)}</Typography>
			<Typography align="right" color={colors.gray}></Typography>
			{application.isActive ? (
				completed ? (
					<Button onClick={handleClick} color="secondary" variant="outlined" disabled>
						Завершено
					</Button>
				) : (
					<Button onClick={handleClick} color="success" variant="contained">
						Завершить заявку
					</Button>
				)
			) : (
				<Button disabled variant="outlined">
					Завершено {formatDate(application.updated_at)}
				</Button>
			)}
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	) : (
		<LoadingPage />
	);
};

export default ApplicationPage;

import { type SyntheticEvent, useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Tab, Tabs, Typography } from '@mui/material';

import { Ceil, Snackbar } from 'Components';
import { getApplications } from 'Api/applications';
import { formatDate } from 'Helpers';
import { type IApplication, type ISnackbar } from 'Interfaces';
import 'Assets/Styles/Pages/ApplicationsPage.scss';

const ApplicationsPage: FC = () => {
	const [applications, setApplications] = useState<IApplication[]>([]);
	const [activeTab, setActiveTab] = useState(0);
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const { status, data } = await getApplications();

			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			setApplications(data as IApplication[]);
		})();
	}, []);

	const handleChange = (e: SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	const handleClick = (path: string) => {
		navigate(path);
	};

	return (
		<Stack m={4} className="applicationsPage">
			<Tabs
				value={activeTab}
				onChange={handleChange}
				variant="fullWidth"
				className="applicationsPage__tabs"
			>
				<Tab label="Открытие заявки" />
				<Tab label="Завершенные заявки" />
			</Tabs>
			{activeTab === 0 ? (
				<Stack spacing={2}>
					{applications.map(
						(application) =>
							application.isActive && (
								<Ceil
									key={application.id}
									left={
										<Typography color="text.secondary">
											{formatDate(application.created_at)}
										</Typography>
									}
									center={<Typography>{application.name}</Typography>}
									right={<Button variant="outlined">Перейти</Button>}
									onClick={() => {
										handleClick(`application/${application.id}`);
									}}
								/>
							),
					)}
				</Stack>
			) : (
				<Stack spacing={2}>
					{applications.map(
						(application) =>
							!application.isActive && (
								<Ceil
									key={application.id}
									left={
										<Typography color="text.secondary">
											{formatDate(application.created_at)}
										</Typography>
									}
									center={<Typography>{application.name}</Typography>}
									right={
										<Button
											onClick={() => {
												handleClick(`application/${application.id}`);
											}}
										>
											Перейти
										</Button>
									}
								/>
							),
					)}
				</Stack>
			)}
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default ApplicationsPage;

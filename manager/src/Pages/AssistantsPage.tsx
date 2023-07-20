import { type ChangeEvent, useEffect, useState, type FC } from 'react';
import { Button, ButtonGroup, Pagination, Stack, Typography } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Ceil, Modal, Snackbar } from 'Components';
import { deleteAssistant, getAssistants } from 'Api/assistants';
import { type IAssistant, type ISnackbar } from 'Interfaces';
import 'Assets/Styles/Pages/AssistantsPage.scss';

import AddAssistantPage from './AddAssistantPage';
import UpdateAssistantPage from './UpdateAssistantPage';

const AssistantsPage: FC = () => {
	const [assistants, setAssistants] = useState<IAssistant[]>([]);
	const [selectedAssistant, setSelectedAssistant] = useState<IAssistant>();
	const [open, setOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [reloadPage, setReloadPage] = useState(false);

	const handleCreate = () => {
		setSelectedAssistant(undefined);
		setOpen(!open);
	};

	const handleDelete = async (id: string) => {
		const { status, data } = await deleteAssistant({ id });
		if (status !== 200) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setReloadPage(!reloadPage);
		setSnackbar({ text: data, variant: 'success' });
	};

	const handleUpdate = (employee: IAssistant) => {
		setOpen(!open);
		setSelectedAssistant(employee);
	};

	const handlePage = (e: ChangeEvent<unknown>, newPage: number) => {
		setCurrentPage(newPage);
	};

	useEffect(() => {
		(async () => {
			const { status, data } = await getAssistants({ page: currentPage });
			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			if (typeof data === 'object' && 'assistants' in data) {
				setAssistants(data.assistants);
				setTotalPages(data.totalPages);
			}
		})();
	}, [reloadPage, currentPage]);

	return assistants ? (
		<Stack spacing={4} width={{ xs: '100%', md: '85%' }} className="assistantsPage">
			<Button onClick={handleCreate}>Добавить сотрудника</Button>
			<Stack spacing={3}>
				{assistants.map((assistant) => (
					<Ceil
						key={assistant.id}
						left={<Typography>{assistant.fio}</Typography>}
						center={<Typography color="text.secondary">{assistant.work_address}</Typography>}
						right={
							<ButtonGroup>
								<Button
									color="secondary"
									variant="contained"
									onClick={() => {
										handleUpdate(assistant);
									}}
								>
									Изменить
								</Button>
								<Button
									color="error"
									variant="contained"
									onClick={async () => handleDelete(assistant.id)}
								>
									Удалить
								</Button>
							</ButtonGroup>
						}
					/>
				))}
			</Stack>
			{assistants.length > 0 && (
				<Pagination
					shape="rounded"
					color="primary"
					variant="outlined"
					count={totalPages}
					page={currentPage}
					onChange={handlePage}
					siblingCount={0}
					boundaryCount={0}
					sx={{ ml: 'auto !important' }}
				/>
			)}
			<Modal open={open} onClose={setOpen}>
				{selectedAssistant ? (
					<UpdateAssistantPage
						selectedAssistant={selectedAssistant}
						setReloadPage={setReloadPage}
						reloadPage={reloadPage}
					/>
				) : (
					<AddAssistantPage setReloadPage={setReloadPage} reloadPage={reloadPage} />
				)}
			</Modal>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	) : (
		<LoadingPage />
	);
};

export default AssistantsPage;

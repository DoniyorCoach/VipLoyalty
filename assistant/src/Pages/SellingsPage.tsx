import { type ChangeEvent, useEffect, useState, type FC } from 'react';
import { Box, List, ListItem, ListItemText, Pagination, Stack, Typography } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Snackbar } from 'Components';
import { getTransactionsByAssistant } from 'Api/transactions';
import { formatAmount, formatDate, hideCardNumber } from 'Helpers';
import colors from 'Assets/colors';
import { type ISnackbar, type ITransaction } from 'Interfaces';

const SellingsPage: FC = () => {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	useEffect(() => {
		(async () => {
			const { status, data } = await getTransactionsByAssistant({ page: currentPage });

			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			if (typeof data === 'object' && 'transactions' in data) {
				setTransactions(data.transactions);
				setTotalPages(data.totalPages);
			}
		})();
	}, [currentPage]);

	const handlePage = (e: ChangeEvent<unknown>, newPage: number) => {
		setCurrentPage(newPage);
	};

	return transactions.length ? (
		<Box className="sellingsPage" m={{ xs: 2, md: 5 }}>
			<Typography variant="h5" color="primary" align="center" fontWeight="bold">
				История продаж
			</Typography>
			{transactions.length > 0 ? (
				<Stack spacing={3}>
					<List>
						{transactions.map((transaction) => (
							<ListItem
								key={transaction.id}
								secondaryAction={
									<Typography variant="h6">{`${formatAmount(transaction.amount)} ₽ `}</Typography>
								}
							>
								<ListItemText
									primaryTypographyProps={{ variant: 'h6' }}
									secondaryTypographyProps={{ variant: 'subtitle1' }}
									primary={hideCardNumber(transaction.card_number ?? 0)}
									secondary={formatDate(transaction.created_at)}
								/>
							</ListItem>
						))}
					</List>
					<Pagination
						shape="rounded"
						color="primary"
						variant="outlined"
						count={totalPages}
						page={currentPage}
						onChange={handlePage}
						showFirstButton
						siblingCount={0}
						showLastButton
						boundaryCount={0}
						sx={{ ml: 'auto !important' }}
					/>
				</Stack>
			) : (
				<Typography align="center" color={colors.warning}>
					На данный момент вы ещё не совершили продажи.
				</Typography>
			)}
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Box>
	) : (
		<LoadingPage />
	);
};

export default SellingsPage;

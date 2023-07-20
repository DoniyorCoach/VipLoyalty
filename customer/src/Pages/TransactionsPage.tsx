import { useState, useEffect, type ChangeEvent, type FC } from 'react';
import { List, ListItem, ListItemText, Pagination, Stack, Typography } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Snackbar } from 'Components';
import { getTransactionsByCardNumber } from 'Api/transactions';
import { formatAmount, formatDate } from 'Helpers';
import colors from 'Assets/colors';
import { type ISnackbar, type ITransaction, type ITransactionsPageProps } from 'Interfaces';

const TransactionsPage: FC<ITransactionsPageProps> = ({ cardNumber }) => {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	useEffect(() => {
		(async () => {
			const { status, data } = await getTransactionsByCardNumber({ cardNumber, page: currentPage });

			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			if (typeof data === 'object' && 'transactions' in data) {
				setTransactions(data.transactions);
				setTotalPages(data.totalPages);
			}
		})();
	}, [cardNumber, currentPage]);

	const handlePage = (e: ChangeEvent<unknown>, newPage: number) => {
		setCurrentPage(newPage);
	};

	return transactions ? (
		<Stack spacing={3} className="customerTransactionsPage">
			<Typography variant="h6" color="primary" align="center" fontWeight="bold">
				История покупок
			</Typography>
			{transactions.length > 0 ? (
				<Stack spacing={3} width={{ xs: '100%', md: '80%', lg: '70%' }} m={'auto !important'}>
					<List>
						{transactions.map((transaction) => (
							<ListItem
								key={transaction.id}
								secondaryAction={
									<Typography variant="h6" color={colors.success}>
										+ {transaction.points}
									</Typography>
								}
							>
								<ListItemText
									primary={`${formatAmount(transaction.amount)} ₽`}
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
					На данный момент вы ещё не совершили покупки.
				</Typography>
			)}
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	) : (
		<LoadingPage />
	);
};

export default TransactionsPage;

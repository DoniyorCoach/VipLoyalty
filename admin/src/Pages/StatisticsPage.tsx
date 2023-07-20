import { useState, type FC, useEffect } from 'react';
import { Stack, Tooltip, Typography } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Ceil, Chart, Snackbar } from 'Components';
import { formatAmount } from 'Helpers';
import colors from 'Assets/colors';
import { type IStatisticsForAdmin, type ISnackbar } from 'Interfaces';
import { getStatisticsForAdmin } from 'Api/statistics';

const StatisticsPage: FC = () => {
	const [data, setData] = useState<IStatisticsForAdmin>();
	const [warnings, setWarnings] = useState('');
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	console.log(data);

	useEffect(() => {
		(async () => {
			const { status, data } = await getStatisticsForAdmin();

			if (status === 102) {
				setWarnings(data as string);
				return;
			}

			if (status !== 200) {
				setSnackbar({ variant: 'error', text: data as string });
				return;
			}

			setData(data as IStatisticsForAdmin);
		})();
	}, []);

	return data ? (
		<Stack m={5} gap={5}>
			<Stack direction={{ sm: 'row' }} gap={3}>
				<Ceil
					left={<Typography>Количество пользователей</Typography>}
					right={<Typography>{formatAmount(data.customers)}</Typography>}
					flex={1}
				/>
				<Ceil
					left={<Typography>Количество бизнесов</Typography>}
					right={<Typography>{formatAmount(data.businesses)}</Typography>}
					flex={1}
				/>
				<Ceil
					left={<Typography>Количество бизнес персонала</Typography>}
					right={<Typography>{formatAmount(data.businessAssistants)}</Typography>}
					flex={1}
				/>
			</Stack>
			<Stack direction={{ sm: 'row' }} gap={3}>
				<Ceil
					left={<Typography>Карт выпущено</Typography>}
					right={<Typography>{formatAmount(data.issuedCards)}</Typography>}
					flex={1}
				/>
				<Ceil
					left={
						<Tooltip title="Карты, на которых была совершена хотя бы одна покупка">
							<Typography sx={{ textDecoration: 'underline dashed  #ABABAB' }}>
								Активные карты
							</Typography>
						</Tooltip>
					}
					right={<Typography>{formatAmount(data.activeCards)}</Typography>}
					flex={1}
				/>
				<Ceil
					left={<Typography>Карт заблокировано</Typography>}
					right={<Typography>{formatAmount(data.blockedCards)}</Typography>}
					flex={1}
				/>
			</Stack>
			<Stack direction={{ md: 'row' }}>
				<Stack flex={1}>
					<Chart type="pie" title="Возраст" data={data.age} />
				</Stack>
				<Stack flex={1}>
					<Chart type="pie" title="Пол" data={data.gender} />
				</Stack>
			</Stack>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	) : warnings ? (
		<Typography align="center" m={5} color={colors.warning}>
			{warnings}
		</Typography>
	) : (
		<LoadingPage />
	);
};

export default StatisticsPage;

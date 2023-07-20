import { type FC, useEffect, useState } from 'react';
import { Stack, Tooltip, Typography } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Ceil, Chart, Snackbar } from 'Components';
import { getStatisticsForManager } from 'Api/statistics';
import { formatAmount } from 'Helpers';
import colors from 'Assets/colors';
import { type ISnackbar, type IStatisticsForManager } from 'Interfaces';

const StatisticsPage: FC = () => {
	const [data, setData] = useState<IStatisticsForManager>();
	const [warnings, setWarnings] = useState('');
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	useEffect(() => {
		(async () => {
			const { status, data } = await getStatisticsForManager();

			if (status === 102) {
				setWarnings(data as string);
				return;
			}

			if (status !== 200) {
				setSnackbar({ variant: 'error', text: data as string });
				return;
			}

			setData(data as IStatisticsForManager);
		})();
	}, []);

	return data ? (
		<Stack m={5} gap={5}>
			<Stack gap={2}>
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
				</Stack>
				<Stack direction={{ sm: 'row' }} gap={3}>
					<Ceil
						left={<Typography>Баланс бонусов у клиентов</Typography>}
						right={<Typography>{formatAmount(data.pointsBalance)}</Typography>}
						flex={1}
					/>
					<Ceil
						left={<Typography>Карт заблокировано</Typography>}
						right={<Typography>{formatAmount(data.blockedCards)}</Typography>}
						flex={1}
					/>
				</Stack>
				<Stack direction={{ sm: 'row' }} gap={3}>
					<Ceil
						left={<Typography>Количество магазинов</Typography>}
						right={<Typography>{formatAmount(data.storesCount)}</Typography>}
						flex={1}
					/>
					<Ceil
						left={<Typography>Количество сотрудников</Typography>}
						right={<Typography>{formatAmount(data.assistantsCount)}</Typography>}
						flex={1}
					/>
				</Stack>
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

import { useState, useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { getIssuedCard } from 'Api/issuedCards';
import { type IIssuedCard } from 'Interfaces';
import TransactionsPage from './TransactionsPage';

const WalletsItemPage: FC = () => {
	const [card, setCard] = useState<IIssuedCard>();

	const location = useLocation();
	const navigate = useNavigate();

	const id = location.pathname.split('/').pop();

	useEffect(() => {
		(async () => {
			if (!id) {
				return;
			}

			const { status, data } = await getIssuedCard({ id });
			if (status !== 200) {
				navigate(-1);
				return;
			}

			setCard(data);
		})();
	}, [id, navigate]);

	return card ? (
		<Stack spacing={10} m={{ xs: 2, sm: 5 }} className="walletsItemPage">
			<Stack
				direction={{ sm: 'row' }}
				justifyContent={{ sm: 'space-between', md: 'space-around' }}
				gap={5}
			>
				<Stack spacing={2} flex={{ sm: 0.6, md: 0.4, lg: 0.35 }}>
					<Box component="img" src={card.image} borderRadius={2} />
					<Typography variant="h6" component="h3" fontWeight="bold" align="center">
						{card.name}
					</Typography>
					<Typography variant="subtitle1" fontWeight="bold" color="text.secondary" align="center">
						{card.balance} баллов
					</Typography>
				</Stack>
				<Stack flex={{ sm: 0.4, md: 0.3, lg: 0.2 }}>
					<Typography variant="h5" component="h5" align="center">
						Номер карты
					</Typography>
					<Typography variant="subtitle1" color="text.secondary" align="center">
						{card.card_number}
					</Typography>
					<Box
						component="img"
						src={card.qrcode}
						className="qrcode"
						width={{ xs: '70%', sm: '90%' }}
						m="auto"
					/>
				</Stack>
			</Stack>
			{card.card_number && <TransactionsPage cardNumber={card.card_number} />}
		</Stack>
	) : (
		<LoadingPage />
	);
};

export default WalletsItemPage;

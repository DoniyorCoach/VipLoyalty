import { useState, useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Payments, AddCard } from '@mui/icons-material';

import LoadingPage from 'Pages/LoadingPage';
import { Carousel, Snackbar } from 'Components';

import { issueCard } from 'Api/issuedCards';
import { getLoyalty, getLoyaltyRecommendations } from 'Api/loyalties';

import { type ICatalogCard, type ISnackbar } from 'Interfaces';

const CatalogItemPage: FC = () => {
	const [card, setCard] = useState<ICatalogCard>();
	const [issuedCardId, setIssuedId] = useState('');
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [recommendations, setRecommendations] = useState<ICatalogCard[]>([]);

	const navigate = useNavigate();
	const location = useLocation();
	const cardId = location.pathname.split('/').pop();

	useEffect(() => {
		if (!cardId) {
			return;
		}

		(async () => {
			const { status, data } = await getLoyalty({ id: cardId });

			if (status === 200) {
				setCard(data);
				return;
			}

			navigate(-1);
		})();
	}, [cardId, navigate]);

	useEffect(() => {
		if (!cardId) {
			return;
		}

		(async () => {
			const { status, data } = await getLoyaltyRecommendations({ id: cardId });
			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
			}

			setRecommendations(data as ICatalogCard[]);
		})();
	}, [cardId]);

	const handleClick = async () => {
		if (!card) {
			return;
		}

		if (issuedCardId) {
			navigate(`/card/${issuedCardId}`);
			return;
		}

		const { status, data } = await issueCard({ id: card.id });
		if (status !== 200) {
			setSnackbar({ text: data as string, variant: 'error' });
			return;
		}

		if (typeof data === 'object' && 'id' in data) {
			setIssuedId(data.id);
		}
	};

	return card ? (
		<Stack spacing={8} m={{ xs: 2, sm: 5 }}>
			<Stack direction={{ md: 'row' }} gap={6}>
				<Stack spacing={3} flex={0.4}>
					<Box component="img" src={card.image} borderRadius={2} />
					{issuedCardId ? (
						<Button variant="outlined" size="large" startIcon={<Payments />} onClick={handleClick}>
							Открыть
						</Button>
					) : (
						<Button variant="contained" size="large" startIcon={<AddCard />} onClick={handleClick}>
							Выпустить
						</Button>
					)}
				</Stack>
				<Stack spacing={2} flex={0.6}>
					<Typography variant="h5" fontWeight="bold" component="h2" align="center">
						{card.name}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						{parse(card.description)}
					</Typography>
				</Stack>
			</Stack>
			{recommendations.length > 0 && (
				<Stack spacing={2}>
					<Typography variant="h5" fontWeight="bold">
						Рекомендуемые
					</Typography>
					<Carousel cards={recommendations} />
				</Stack>
			)}
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	) : (
		<LoadingPage />
	);
};

export default CatalogItemPage;

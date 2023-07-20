import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Stack, Box } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Snackbar } from 'Components';
import { getIssuedCards } from 'Api/issuedCards';
import { type IIssuedCard, type ISnackbar } from 'Interfaces';
import 'Assets/Styles/Pages/WalletsPage.scss';

const WalletsPage: FC = () => {
	const [cards, setCards] = useState<IIssuedCard[]>([]);
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const { status, data } = await getIssuedCards();

			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			setCards(data as IIssuedCard[]);
			setLoading(false);
		})();
	}, []);

	const handleClick = (id: string) => {
		navigate(`/card/${id}`);
	};

	return loading ? (
		<LoadingPage />
	) : (
		<Stack m={{ xs: 2, sm: 5 }} gap={4} className="walletsPage">
			{cards.length > 0 ? (
				<Typography component="h1" variant="h4" color="secondary" fontWeight="bold">
					Мои карты
				</Typography>
			) : (
				<Typography component="h1" variant="h5" align="center" color="secondary" fontWeight="bold">
					Нет выпущенных карт
				</Typography>
			)}
			<Grid container spacing={2} rowSpacing={4}>
				{cards.map((card) => (
					<Grid item key={card.id} xs={12} sm={6} lg={4}>
						<Box
							component="img"
							src={card.image}
							onClick={() => {
								handleClick(card.id);
							}}
							className="walletsPage__card"
							draggable="false"
							alt="loyalty_card"
						/>
					</Grid>
				))}
			</Grid>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default WalletsPage;

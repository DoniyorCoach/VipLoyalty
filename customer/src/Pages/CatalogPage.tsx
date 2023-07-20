import { useState, useEffect, type FC } from 'react';
import { Typography, Stack, Chip } from '@mui/material';
import { Link } from 'react-scroll';

import LoadingPage from 'Pages/LoadingPage';
import { Carousel, Snackbar } from 'Components';
import { getLoyalties } from 'Api/loyalties';
import { spaceToDash } from 'Helpers';
import { type ICatalogCards, type ISnackbar } from 'Interfaces';

const CatalogPage: FC = () => {
	const [cards, setCards] = useState<ICatalogCards>({});
	const [loading, setLoading] = useState(true);
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	useEffect(() => {
		(async () => {
			const { status, data } = await getLoyalties();
			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
			}

			setCards(data as ICatalogCards);
			setLoading(false);
		})();
	}, []);

	return loading ? (
		<LoadingPage />
	) : (
		<Stack spacing={5} m={{ xs: 2, sm: 5 }}>
			{Object.keys(cards).length > 0 ? (
				<Typography component="h1" variant="h4" color="secondary" fontWeight="bold">
					Дисконтные карты
				</Typography>
			) : (
				<Typography component="h1" variant="h5" align="center" color="secondary" fontWeight="bold">
					Вы выпустили все доступные дисконтные карты
				</Typography>
			)}
			<Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
				{Object.entries(cards).map(([categoryName, categoryCards]) => (
					<Link
						to={spaceToDash(categoryName)}
						key={categoryName}
						smooth
						offset={-100}
						duration={600}
					>
						<Chip label={`${categoryName} ${categoryCards.length}`} color="primary" clickable />
					</Link>
				))}
			</Stack>
			<Stack spacing={6}>
				{Object.entries(cards).map(([categoryName, categoryCards]) => (
					<Stack spacing={2} key={categoryName}>
						<Typography variant="h5" fontWeight="bold" id={spaceToDash(categoryName)}>
							{categoryName}
						</Typography>
						<Carousel cards={categoryCards} />
					</Stack>
				))}
			</Stack>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	);
};

export default CatalogPage;

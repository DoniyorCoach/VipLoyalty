import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { Box, Skeleton, Stack, Typography } from '@mui/material';

import { type ICarouselComponentProps } from 'Interfaces';

import 'react-alice-carousel/lib/scss/alice-carousel.scss';
import 'Assets/Styles/Components/Carousel.scss';

const Carousel: FC<ICarouselComponentProps> = ({ cards }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [play, setPlay] = useState(false);

	const navigate = useNavigate();

	const handleClick = (id: string) => {
		navigate(`/catalog/${id}`);
	};

	const responsive = {
		0: {
			items: 1,
		},
		800: {
			items: 2,
			itemsFit: 'contain',
		},
		1200: {
			items: 3,
			itemsFit: 'contain',
		},
		1600: {
			items: 4,
			itemsFit: 'contain',
		},
		2000: {
			items: 5,
			itemsFit: 'contain',
		},
	};

	useEffect(() => {
		const numVisibleCards = Math.ceil(window.innerWidth / 400);

		setPlay(cards.length > numVisibleCards);

		if (numVisibleCards === cards.length) {
			setPlay(false);
		}
	}, [cards]);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	return (
		<Box className="carousel">
			<AliceCarousel
				mouseTracking
				autoPlay={play}
				infinite={play}
				animationDuration={5000}
				disableDotsControls={!play}
				disableButtonsControls
				items={cards.map((card) => (
					<Stack
						key={card.id}
						className="card__wrapper"
						spacing={2}
						onClick={() => {
							handleClick(card.id);
						}}
					>
						{!imageLoaded && <Skeleton variant="rounded" height={230} />}
						<Box
							component="img"
							src={card.image}
							onLoad={handleImageLoad}
							className="card"
							draggable="false"
							alt="loyalty"
						/>
						<Typography variant="button" fontWeight="bold">
							{card.name}
						</Typography>
					</Stack>
				))}
				responsive={responsive}
			/>
		</Box>
	);
};

export default Carousel;

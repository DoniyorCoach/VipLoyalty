import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@mui/material';

const NotFoundPage: FC = () => (
	<Container maxWidth="sm">
		<Box textAlign="center">
			<Box
				component="img"
				src="https://img.freepik.com/free-vector/isometric-error-background-hand-reaches-out-from-hole-with-sign-error-four-hundred-four-vector-illustration_1284-67441.jpg?w=996&t=st=1686498956~exp=1686499556~hmac=68a00df3ebd6d74bdfa767b9e8d794f8f01a2753d2c82edf35b4a31eeb40df90"
				alt="error"
			/>
			<Typography variant="h3" color="primary">
				404
			</Typography>
			<Typography variant="h4" component="h2" gutterBottom={true}>
				Что-то пошло не так!
			</Typography>
			<Typography variant="subtitle1" color="textSecondary">
				Страница, которую вы запрашиваете, не существует. Возможно она устарела, была удалена, или
				был введен неверный адрес в адресной строке.
			</Typography>
			<Link to={'/'}>
				<Button variant="contained" color="primary" sx={{ mt: 3 }}>
					На главную
				</Button>
			</Link>
		</Box>
	</Container>
);

export default NotFoundPage;

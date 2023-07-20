import { type FC } from 'react';
import { CircularProgress, Stack } from '@mui/material';

import 'Assets/Styles/Pages/LoadingPage.scss';

const LoadingPage: FC = () => (
	<Stack className="loadingPage">
		<CircularProgress />
	</Stack>
);

export default LoadingPage;

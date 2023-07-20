import { type FC } from 'react';
import { Box, Card, Divider } from '@mui/material';

import { type ICeilComponentProps } from 'Interfaces';
import 'Assets/Styles/Components/Ceil.scss';

const Ceil: FC<ICeilComponentProps> = ({ left, center, right, flex, onClick }) => (
	<Card className="ceil" sx={{ flexDirection: { xs: 'column', md: 'row' }, flex }} onClick={onClick}>
		{left}
		{left && <Divider flexItem />}
		<Box component="span" className="ceil__text">
			{center}
		</Box>
		{right}
	</Card>
);

export default Ceil;

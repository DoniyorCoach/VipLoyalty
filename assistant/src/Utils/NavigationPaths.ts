import { PointOfSale, ShoppingBag } from '@mui/icons-material';

import { type INavigationPath } from 'Interfaces';

export const assistantNavigations: INavigationPath[] = [
	{
		label: 'Касса',
		icon: PointOfSale,
		path: '',
	},
	{
		label: 'Продажи',
		icon: ShoppingBag,
		path: 'sellings',
	},
];

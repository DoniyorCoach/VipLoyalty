import { Wallet, Style, Notifications } from '@mui/icons-material';

import { type INavigationPath } from 'Interfaces';

export const customerNavigations: INavigationPath[] = [
	{
		label: 'Кошелёк',
		icon: <Wallet />,
		path: '',
	},
	{
		label: 'Каталог',
		icon: <Style />,
		path: 'catalog',
	},
	{
		label: 'Сообщение',
		icon: <Notifications />,
		path: 'support',
	},
];

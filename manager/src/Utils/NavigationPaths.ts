import { QueryStats, ManageAccounts, CardMembership, Storefront } from '@mui/icons-material';

import { type INavigationPath } from 'Interfaces';

export const managerNavigations: INavigationPath[] = [
	{
		label: 'Статистика',
		icon: QueryStats,
		path: '',
	},
	{
		label: 'Персонал',
		icon: ManageAccounts,
		path: 'assistants',
	},
	{
		label: 'Магазины',
		icon: Storefront,
		path: 'shops',
	},
	{
		label: 'Программа',
		icon: CardMembership,
		path: 'program',
	},
];

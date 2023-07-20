import { QueryStats, PublishedWithChanges, Chat, KeyboardCommandKey } from '@mui/icons-material';

import { type INavigationPath } from 'Interfaces';

export const adminNavigations: INavigationPath[] = [
	{
		label: 'Заявки',
		icon: PublishedWithChanges,
		path: '',
	},
	{
		label: 'Техподдержка',
		icon: Chat,
		path: 'support',
	},
	{
		label: 'Управление',
		icon: KeyboardCommandKey,
		path: 'management',
	},
	{
		label: 'Статистика',
		icon: QueryStats,
		path: 'statistics',
	},
];

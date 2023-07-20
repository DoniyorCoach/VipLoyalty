import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { List, ListItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { DarkMode } from '@mui/icons-material';

import { themeStore } from 'Store';

const ThemeSwitcher: FC = () => {
	const handleThemeToggle = () => {
		themeStore.toggleDarkMode();
	};

	return (
		<List>
			<ListItem>
				<ListItemIcon>
					<DarkMode />
				</ListItemIcon>
				<ListItemText primary="Тёмный режим" />
				<Switch edge="end" onChange={handleThemeToggle} checked={themeStore.darkMode} />
			</ListItem>
		</List>
	);
};

export default observer(ThemeSwitcher);

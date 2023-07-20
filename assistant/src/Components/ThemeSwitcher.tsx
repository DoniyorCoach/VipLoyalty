import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

import { themeStore } from 'Store';
import { type ThemeSwitcherProps } from 'Interfaces';

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ lite }) => {
	const handleThemeToggle = () => {
		themeStore.toggleDarkMode();
	};

	return lite ? (
		<IconButton onClick={handleThemeToggle} color="inherit">
			{themeStore.darkMode ? <LightMode /> : <DarkMode />}
		</IconButton>
	) : (
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

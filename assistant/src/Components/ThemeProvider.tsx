import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

import { themeStore } from 'Store';
import { type ThemeProviderProps } from 'Interfaces';

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const theme = createTheme({
		palette: {
			mode: themeStore.darkMode ? 'dark' : 'light',
		},
		// Настройки темы
	});

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
};

export default observer(ThemeProvider);

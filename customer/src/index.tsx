import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';

import Router from 'Routes';
import { ThemeProvider } from 'Components';

import './index.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		// <StrictMode>
		<SnackbarProvider maxSnack={5}>
			<ThemeProvider>
				<Router />
			</ThemeProvider>
		</SnackbarProvider>,
		// </StrictMode>
	);
}

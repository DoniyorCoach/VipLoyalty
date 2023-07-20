import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Navbar, Navigation } from 'Components';
import { adminNavigations } from 'Utils/NavigationPaths';

const DefaultLayout = () => (
	<Stack component="main" className="layout">
		<Navbar />
		<Outlet />
		<Navigation navigations={adminNavigations} />
	</Stack>
);

export default DefaultLayout;

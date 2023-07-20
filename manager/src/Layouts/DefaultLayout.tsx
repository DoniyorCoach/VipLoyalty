import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Navbar, Navigation } from 'Components';
import { managerNavigations } from 'Utils/NavigationPaths';

const DefaultLayout = () => (
	<Stack component="main" className="layout">
		<Navbar />
		<Outlet />
		<Navigation navigations={managerNavigations} />
	</Stack>
);

export default DefaultLayout;

import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Navbar, Navigation } from 'Components';
import { customerNavigations } from 'Utils/NavigationPaths';

const DefaultLayout = () => (
	<Stack component="main" className="layout">
		<Navbar />
		<Outlet />
		<Navigation navigations={customerNavigations} />
	</Stack>
);

export default DefaultLayout;

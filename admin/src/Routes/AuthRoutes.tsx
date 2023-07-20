import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import DefaultLayout from 'Layouts/DefaultLayout';
import {
	SettingsPage,
	StatisticsPage,
	SupportPage,
	ApplicationPage,
	ApplicationsPage,
	ChatListPage,
	ManagementPage,
	NotFoundPage,
} from 'Pages';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '',
				element: <ApplicationsPage />,
			},
			{
				path: 'application/:id',
				element: <ApplicationPage />,
			},
			{
				path: 'management',
				element: <ManagementPage />,
			},
			{
				path: 'support',
				element: <ChatListPage />,
			},
			{
				path: 'support/:id',
				element: <SupportPage />,
			},
			{
				path: 'statistics',
				element: <StatisticsPage />,
			},
			{
				path: 'settings',
				element: <SettingsPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
]);

const AdmintRoutes = () => <RouterProvider router={routes} />;

export default AdmintRoutes;

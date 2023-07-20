import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AddressesPage, AssistantsPage, SettingsPage, StatisticsPage, ProgramPage } from 'Pages';
import NotFoundPage from 'Pages/NotFoundPage';
import DefaultLayout from 'Layouts/DefaultLayout';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <StatisticsPage />,
			},
			{
				path: 'assistants',
				element: <AssistantsPage />,
			},
			{
				path: 'shops',
				element: <AddressesPage />,
			},
			{
				path: 'program',
				element: <ProgramPage />,
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

const ManagerRoutes = () => <RouterProvider router={routes} />;

export default ManagerRoutes;

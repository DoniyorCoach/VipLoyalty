import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { SettingsPage, CashRegisterPage, SellingsPage } from 'Pages';
import NotFoundPage from 'Pages/NotFoundPage';
import DefaultLayout from 'Layouts/DefaultLayout';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '',
				element: <CashRegisterPage />,
			},
			{
				path: 'sellings',
				element: <SellingsPage />,
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

const AssistantRoutes = () => <RouterProvider router={routes} />;

export default AssistantRoutes;

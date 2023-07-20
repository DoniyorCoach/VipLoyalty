import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import DefaultLayout from 'Layouts/DefaultLayout';
import {
	CatalogItemPage,
	CatalogPage,
	SettingsPage,
	WalletsItemPage,
	WalletsPage,
	SupportPage,
} from 'Pages';
import NotFoundPage from 'Pages/NotFoundPage';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <WalletsPage />,
			},
			{
				path: 'card/:id',
				element: <WalletsItemPage />,
			},
			{
				path: 'catalog',
				element: <CatalogPage />,
			},
			{
				path: 'catalog/:id',
				element: <CatalogItemPage />,
			},
			{
				path: 'settings',
				element: <SettingsPage />,
			},
			{
				path: 'support',
				element: <SupportPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
]);

const AuthRoutes = () => <RouterProvider router={routes} />;

export default AuthRoutes;

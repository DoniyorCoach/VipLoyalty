import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthorizationPage } from 'Pages';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <AuthorizationPage />,
	},

	{
		path: '*',
		element: <Navigate to={'/'} />,
	},
]);

const WelcomePageRoutes = () => <RouterProvider router={routes} />;

export default WelcomePageRoutes;

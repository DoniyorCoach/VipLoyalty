import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { B2BPage, WelcomePage } from 'Pages';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <WelcomePage />,
	},
	{
		path: '/b2b',
		element: <B2BPage />,
	},
	{
		path: '*',
		element: <Navigate to={'/'} />,
	},
]);

const NotAuthRoutes = () => <RouterProvider router={routes} />;

export default NotAuthRoutes;

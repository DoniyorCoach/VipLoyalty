import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { authentication } from 'Api/credentials';
import { userStore } from 'Store';
import LoadingPage from 'Pages/LoadingPage';

import AuthRoutes from './AuthRoutes';
import NotAuthRoutes from './NotAuthRoutes';

const Router = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const { status, data } = await authentication();

			if (status === 200) {
				localStorage.setItem('token', data.token);
				userStore.setIsAuth(true, data.user);
			} else {
				userStore.setIsAuth(false);
				localStorage.removeItem('token');
			}

			setLoading(false);
		})();
	}, []);

	return loading ? <LoadingPage /> : userStore.isAuth ? <AuthRoutes /> : <NotAuthRoutes />;
};

export default observer(Router);

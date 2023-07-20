import { useState, useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import { type INavigationPageProps } from 'Interfaces';
import 'Assets/Styles/Components/Navigation.scss';
import { userStore } from 'Store';

const Navigation: FC<INavigationPageProps> = ({ navigations }) => {
	const [active, setActive] = useState<number | undefined>(undefined);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const path = location.pathname.split('/').pop();

		navigations.forEach((navigation, tab) => {
			if (navigation.path === path) {
				setActive(tab);
			}
		});

		if (path === 'settings') {
			setActive(undefined);
		} else if (path === 'support' && userStore.user?.role === 'customer') {
			setActive(undefined);
		} else if (active === undefined) {
			setActive(0);
		}
	}, [location, navigations, active]);

	return (
		<BottomNavigation
			component="nav"
			showLabels
			value={active}
			onChange={(event, newValue: number) => {
				setActive(newValue);
			}}
			className="navigation"
		>
			{navigations.map((navigation) => (
				<BottomNavigationAction
					key={navigation.path}
					label={navigation.label}
					icon={<navigation.icon />}
					onClick={() => {
						navigate(navigation.path);
					}}
				/>
			))}
		</BottomNavigation>
	);
};

export default Navigation;

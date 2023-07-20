import { useState, useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge, BottomNavigation, BottomNavigationAction } from '@mui/material';

import { type INavigationPageProps } from 'Interfaces';
import 'Assets/Styles/Components/Navigation.scss';
import { observer } from 'mobx-react-lite';
import { notificationStore } from 'Store';
import { getChatUser } from 'Api/chats';

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
		} else if (active === undefined) {
			setActive(0);
		}
	}, [location, navigations, active]);

	useEffect(() => {
		(async () => {
			const { status, data } = await getChatUser({});

			if (status === 200) {
				notificationStore.setUnreadMessages(data as boolean);
			}
		})();
	}, []);
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
			{navigations.map((navigation, index) => {
				if (index === 2) {
					return (
						<BottomNavigationAction
							key={index}
							label={navigation.label}
							icon={
								<Badge color="primary" variant="dot" invisible={!notificationStore.unreadMessages}>
									{navigation.icon}
								</Badge>
							}
							onClick={() => {
								navigate(navigation.path);
							}}
						/>
					);
				}

				return (
					<BottomNavigationAction
						key={index}
						label={navigation.label}
						icon={navigation.icon}
						onClick={() => {
							navigate(navigation.path);
						}}
					/>
				);
			})}
		</BottomNavigation>
	);
};

export default observer(Navigation);

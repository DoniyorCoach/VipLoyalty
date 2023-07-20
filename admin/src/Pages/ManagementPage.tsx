import { type FC, useState } from 'react';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Stack,
} from '@mui/material';
import { AddBusiness, Delete } from '@mui/icons-material';

import { Modal } from 'Components';

import BusinessRegistrationPage from './BusinessRegistrationPage';
import DeleteLoyaltyPage from './DeleteLoyaltyPage';
import DeleteAddressPage from './DeleteAddressPage';
import DeleteCardPage from './DeleteCardPage';

const ManagementPage: FC = () => {
	const [open, setOpen] = useState(false);
	const [selectedAction, setSelectedAction] = useState<number>();

	const handleAction = (actionNumber: number) => {
		setSelectedAction(actionNumber);
		setOpen(true);
	};

	return (
		<Stack spacing={2} m={4}>
			<List component="nav" subheader={<ListSubheader>Управление</ListSubheader>}>
				<ListItemButton
					onClick={() => {
						handleAction(1);
					}}
				>
					<ListItemIcon>
						<AddBusiness />
					</ListItemIcon>
					<ListItemText primary="Регистрация бизнеса" />
				</ListItemButton>
				<ListItemButton
					onClick={() => {
						handleAction(2);
					}}
				>
					<ListItemIcon>
						<Delete />
					</ListItemIcon>
					<ListItemText primary="Удалить программу лояльности" />
				</ListItemButton>
				<ListItemButton
					onClick={() => {
						handleAction(3);
					}}
				>
					<ListItemIcon>
						<Delete />
					</ListItemIcon>
					<ListItemText primary="Удалить адрес магазина" />
				</ListItemButton>
				<ListItemButton
					onClick={() => {
						handleAction(4);
					}}
				>
					<ListItemIcon>
						<Delete />
					</ListItemIcon>
					<ListItemText primary="Удалить карту пользователя" />
				</ListItemButton>
			</List>
			<Modal open={open} onClose={setOpen}>
				{selectedAction === 1 && <BusinessRegistrationPage />}
				{selectedAction === 2 && <DeleteLoyaltyPage />}
				{selectedAction === 3 && <DeleteAddressPage />}
				{selectedAction === 4 && <DeleteCardPage />}
			</Modal>
		</Stack>
	);
};

export default ManagementPage;

import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';

import LoadingPage from 'Pages/LoadingPage';
import socket from 'Sockets';
import { getChatUser } from 'Api/chats';
import { ManIcon, WomanIcon } from 'Assets/Images';
import { type IChatListItemComponentProps, type IChatListUser, type ISnackbar } from 'Interfaces';
import Snackbar from './Snackbar';

const ChatListItem: FC<IChatListItemComponentProps> = ({ userId, chatId }) => {
	const [user, setUser] = useState<IChatListUser>();
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [reload, setReload] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const { status, data } = await getChatUser({ userId, chatId });

			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			setUser(data as IChatListUser);

			socket.on('receiver_message', () => {
				setReload(!reload);
			});
		})();
	}, [userId, chatId, reload]);

	return user ? (
		<ListItemButton
			onClick={() => {
				navigate(chatId, { state: userId });
			}}
			divider
			selected={user.unreadMessages}
		>
			<ListItemAvatar>
				<Avatar src={user.gender ? WomanIcon : ManIcon} alt="logo" />
			</ListItemAvatar>
			<ListItemText
				primary={user.fio}
				secondary={
					<Typography noWrap color="text.secondary">
						{user.lastMessage}
					</Typography>
				}
			/>
			{user.unreadMessages && <FiberManualRecord color="primary" fontSize="small" />}
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</ListItemButton>
	) : (
		<LoadingPage />
	);
};

export default ChatListItem;

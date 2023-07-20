import { type FC, useEffect, useState } from 'react';
import { List, Stack } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { ChatListItem, Snackbar } from 'Components';
import socket from 'Sockets';
import { getChats } from 'Api/chats';
import { type IChat, type ISnackbar } from 'Interfaces';

const ChatListPage: FC = () => {
	const [chats, setChats] = useState<IChat[]>([]);
	const [snackbar, setSnackbar] = useState<ISnackbar>();
	const [reload, setReload] = useState(false);

	useEffect(() => {
		(async () => {
			const { status, data } = await getChats();
			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			setChats(data as IChat[]);

			socket.on('receiver_message', () => {
				setReload(!reload);
			});
		})();
	}, [reload]);

	return chats ? (
		<Stack width={{ xs: '95%', md: '70%', lg: '50%' }} m="20px auto">
			<List>
				{chats.map((chat) => (
					<ChatListItem key={chat.id} chatId={chat.id} userId={chat.user_id} />
				))}
			</List>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	) : (
		<LoadingPage />
	);
};

export default ChatListPage;

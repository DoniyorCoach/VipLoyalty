import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState, type FC } from 'react';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';

import LoadingPage from 'Pages/LoadingPage';
import { Message, Snackbar } from 'Components';
import socket from 'Sockets';
import { notificationStore, userStore } from 'Store';
import { createMessage, getMessages, setMessagesRead } from 'Api/messages';
import { type IMessage, type ISnackbar } from 'Interfaces';
import 'Assets/Styles/Pages/SupportPage.scss';

const SupportPage: FC = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [text, setText] = useState('');
	const [reload, setReloadPage] = useState(false);
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const scroll = useRef<HTMLDivElement>(null);

	useEffect(() => {
		(async () => {
			const { status, data } = await getMessages({});
			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			setMessages(data as IMessage[]);
		})();

		(async () => {
			const { status, data } = await setMessagesRead({});
			if (status !== 200) {
				setSnackbar({ text: data, variant: 'error' });
			}

			notificationStore.setUnreadMessages(false);
		})();

		socket.on('receiver_message', () => {
			setReloadPage(!reload);
		});
	}, [reload]);

	useEffect(() => {
		if (scroll.current) {
			scroll.current.scrollTop = scroll.current.scrollHeight;
		}
	}, [messages]);

	const handleText = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) =>
		e.key === 'Enter' && handleSend();

	const handleSend = async () => {
		if (text.trim().length === 0) {
			return;
		}

		const { status, data } = await createMessage({ text: text.trim() });
		if (status !== 201) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		socket.emit('new_message', 'admin');
		setText('');
		setReloadPage(!reload);
	};

	return messages ? (
		<Stack m={3} className="supportPage" gap={2}>
			<Typography align="center" variant="h5" fontWeight="bold">
				Техподдержка
			</Typography>
			<Stack className="supportPage__messages" ref={scroll}>
				{messages.map((message) => (
					<Message
						key={message.id}
						text={message.text}
						date={message.created_at}
						admin={message.sender_id !== userStore.user?.id}
						owner={message.sender_id === userStore.user?.id}
					/>
				))}
			</Stack>
			<Stack direction="row" gap={1}>
				<TextField
					fullWidth
					autoFocus
					placeholder="Сообщение"
					value={text}
					onChange={handleText}
					onKeyDown={handleKeyPress}
					className="supportPage__input"
				/>
				<IconButton size="large" color="primary" onClick={handleSend}>
					<Send fontSize="large" />
				</IconButton>
			</Stack>
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	) : (
		<LoadingPage />
	);
};

export default SupportPage;

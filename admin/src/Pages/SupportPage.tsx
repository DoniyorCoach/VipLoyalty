import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { IconButton, Stack, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';

import LoadingPage from 'Pages/LoadingPage';
import { Message, Snackbar } from 'Components';
import socket from 'Sockets';
import { userStore } from 'Store';
import { createMessage, getMessages, setMessagesRead } from 'Api/messages';
import { type IMessage, type ISnackbar } from 'Interfaces';
import 'Assets/Styles/Pages/SupportPage.scss';

const AdminSupportPage: FC = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [text, setText] = useState('');
	const [reload, setReloadPage] = useState(false);
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const scroll = useRef<HTMLDivElement>(null);

	const location = useLocation();
	const chat_id = location.pathname.split('/').pop();

	useEffect(() => {
		if (!chat_id) {
			return;
		}

		(async () => {
			const { status, data } = await getMessages({ chat_id });
			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			setMessages(data as IMessage[]);
		})();

		(async () => {
			const { status, data } = await setMessagesRead({ chat_Id: chat_id });
			if (status !== 200) {
				setSnackbar({ text: data, variant: 'error' });
			}
		})();

		socket.on('receiver_message', () => {
			setReloadPage(!reload);
		});
	}, [reload, chat_id]);

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

		const { status, data } = await createMessage({ text: text.trim(), chat_id });
		if (status !== 201) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setText('');
		socket.emit('new_message', location.state);
		setReloadPage(!reload);
	};

	return messages ? (
		<Stack m={3} className="supportPage" gap={2}>
			<Stack className="supportPage__messages" ref={scroll}>
				{messages.map((message) => (
					<Message
						key={message.id}
						text={message.text}
						date={message.created_at}
						owner={message.sender_id === userStore.user?.id}
					/>
				))}
			</Stack>
			<Stack direction="row" gap={1}>
				<TextField
					autoFocus
					fullWidth
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

export default AdminSupportPage;

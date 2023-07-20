import io, { type Socket } from 'socket.io-client';

import { notificationStore } from 'Store';
import { getChatUser } from 'Api/chats';
import { type IGetChatUser, type IUser } from 'Interfaces';

const socket: Socket = io(process.env.REACT_APP_SOCKET_URL ?? '');

export function initializeSocket(user: IUser) {
	socket.emit('new_user', { userId: user.id, role: user.role });

	socket.on('receiver_message', async () => {
		const { status, data }: IGetChatUser = await getChatUser({});

		if (status === 200) {
			notificationStore.setUnreadMessages(data as boolean);
		}
	});
}

export default socket;

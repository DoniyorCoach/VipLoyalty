import io, { type Socket } from 'socket.io-client';

import { type IUser } from 'Interfaces';

const socket: Socket = io(process.env.REACT_APP_SOCKET_URL ?? '');

export function initializeSocket(user: IUser) {
	socket.emit('new_user', { userId: user.id, role: user.role });
}

export default socket;

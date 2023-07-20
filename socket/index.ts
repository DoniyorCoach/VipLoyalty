import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { config } from 'dotenv';

const server = createServer();
config();

const io = new Server(server, {
	cors: {
		origin: JSON.parse(process.env.CLIENT ?? ''),
	},
});


export interface ISocketUser {
	userId: string;
	socketId: string;
	role: string;
}

let onlineUsers: ISocketUser[] = [];

io.on('connection', async (socket: Socket) => {
	socket.on('new_user', ({ userId, role }) => {
		onlineUsers.map((user, index) => user.userId === userId && onlineUsers.splice(index, 1));
		onlineUsers.push({
			userId,
			socketId: socket.id,
			role,
		});
	});
	socket.on('new_message', (receiverId) => {
		if (receiverId === 'admin') {
			onlineUsers.map(
				(user) => user.role === 'admin' && io.to(user.socketId).emit('receiver_message'),
			);
		} else {
			onlineUsers.map(
				(user) => user.userId === receiverId && io.to(user.socketId).emit('receiver_message'),
			);
		}
	});

	socket.on('disconnect', () => {
		onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
	});
});

server.listen(process.env.PORT, () => {
	console.log(`Socket сервер запущен на порту ${process.env.PORT}`);
});

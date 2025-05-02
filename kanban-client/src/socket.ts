import { io } from 'socket.io-client';

const socket = io('http://localhost:27017/kanban', {
  transports: ['websocket'],
});

export default socket;
import { io, Socket } from 'socket.io-client';

declare const importMeta: { env: ImportMetaEnv };
const SOCKET_URL = importMeta?.env?.VITE_SOCKET_URL || process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001/boards';

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  auth: { token: localStorage.getItem('token') || '' },
});

export function joinBoard(boardId: string): void {
  if (!socket.connected) socket.connect();
  socket.emit('joinBoard', { boardId });
}

export function leaveBoard(boardId: string): void {
  socket.emit('leaveBoard', { boardId });
  socket.disconnect();
}
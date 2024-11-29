import socketClient from 'socket.io-client';

let socket: SocketIOClient.Socket | null = null;

const useSocket = () => {
  if (!socket) {
    socket = socketClient('http://localhost:3000');
  }

  return { socket };
};
export default useSocket;

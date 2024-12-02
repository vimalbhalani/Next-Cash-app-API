import socketClient from 'socket.io-client';

let socket: SocketIOClient.Socket | null = null;

const useSocket = () => {
  if (!socket) {
    socket = socketClient('https://islandhousetest.com');
  }

  return { socket };
};
export default useSocket;

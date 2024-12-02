import socketClient from 'socket.io-client';

let socket: SocketIOClient.Socket | null = null;

const useSocket = () => {
  if (!socket) {
    socket = socketClient('https://cashapp-topaz.vercel.app');
  }

  return { socket };
};
export default useSocket;

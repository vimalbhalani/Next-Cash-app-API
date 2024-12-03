import socketClient from 'socket.io-client';

let socket: SocketIOClient.Socket | null = null;

const useSocket = () => {
  const socketServerUrl = process.env.NEXTAUTH_URL

  if (!socket && socketServerUrl) {
    console.log('--- socket server url when initialized ---', socketServerUrl)
    socket = socketClient(socketServerUrl);
  }

  return { socket };
};
export default useSocket;

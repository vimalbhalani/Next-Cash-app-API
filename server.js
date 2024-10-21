// server.js
const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let connectedUsers = [];

app.prepare().then(() => {
    const server = createServer((req, res) => handle(req, res));

    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('New socket connected:', socket.id);
        

        socket.on('register', ({userId, role}) => {
            connectedUsers.push({ socketId: socket.id, userID: userId, role: role, socket });
        });

        socket.on('userRegister', ({userId, message})=>{
            const recipient_admin = connectedUsers.find((user) => user.role === "admin");
            if(recipient_admin){
                recipient_admin.socket.emit('receiveMessage', message )
            }            
        })

        socket.on('userVerify', ({userId, message})=>{
            const recipient_admin = connectedUsers.find((user) => user.role === "admin");
            if(recipient_admin){
                recipient_admin.socket.emit('receiveMessage', message )
            }            
        })

        socket.on('adminRegister',  (data) => {
            const recipient = connectedUsers.find((user) => user.userID === data.receiveuserId);
            if (recipient) {
              recipient.socket.emit('receiveMessage', data.message);
            }
        });

        socket.on('adminLoginId',  (data) => {
            const recipient = connectedUsers.find((user) => user.userID === data.receiveuserId);
            if (recipient) {
              recipient.socket.emit('receiveMessage', data.message);
            }
        });

        socket.on('adminPasswordCode',  (data) => {
            const recipient = connectedUsers.find((user) => user.userID === data.receiveuserId);
            if (recipient) {
              recipient.socket.emit('receiveMessage', data.message);
            }
        });
        // Handle disconnect
        socket.on('disconnect', () => {
            connectedUsers = connectedUsers.filter(item => item.socketId != socket.id)
            console.log('Socket disconnected:', socket.id, connectedUsers.length);
        });
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});

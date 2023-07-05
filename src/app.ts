import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const socketServer = createServer(app);
const io = new Server(socketServer, {
    path: '/socket',
});

app.get('/test', (req, res) => {
    res.send('up');
});

export { app, socketServer, io };

import { io } from '../app';

io.on('connection', (socket) => {
    console.log('a user connected', socket);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

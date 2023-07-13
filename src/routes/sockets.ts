// attach events to the socket server
import User from '../db/User';
import verifyClient from '../middleware/verifyClient';

function useIO(ws) {
    ws.use(verifyClient);

    ws.on('connection', (socket) => {
        console.log('client up', socket.id);

        // test event
        socket.on('echo', (message) => {
            socket.emit('echo', message);
        });

        // takes a callback from the client
        socket.on('sign-up', async (data, callback) => {
            try {
                const user = await User.create(data);
                if (user) {
                    callback(user);
                }
            } catch (err) {
                callback({ error: err });
            }
        });

        socket.on('user-login', (data) => {
            console.log('login Event', data);
        });

        socket.on('error', (err) => {
            console.log('Random Error: ', err.message);
        });
    });

    ws.on('disconnect', () => {
        console.log('a user disconnected');
    });
}

export { useIO };

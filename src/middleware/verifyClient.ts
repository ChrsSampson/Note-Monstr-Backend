const { config } = require('dotenv');

config();

export default async function verifyClient(req, next) {
    const secret = process.env.SECRET;

    let err = null;

    // auth provided by client {auth: {token: '123', secret: '3455'}} in socket header
    const token = req.handshake.auth.token;

    const clientSecret = req.handshake.auth.secret;

    if (!clientSecret || clientSecret !== secret) {
        err = new Error('Authentication error: Failed to authenticate client');
        err.data = { content: 'Client out of date or invalid' };
    }

    if (!token) {
        err = new Error('Authentication error: No token provided');
        err.data = { content: 'No session token provided' };
    }

    if (err) {
        console.log(err);
        next(err);
    } else {
        next();
    }
}

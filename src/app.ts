import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { useIO } from "./routes/sockets";

const app = express();

app.use(express.json());

const socketServer = createServer(app);
const io = new Server(socketServer, {
    cors: {
        origin: "*",
    },
});

useIO(io);

app.get("/test", (req, res) => {
    res.send("up");
});

export { app, socketServer, io };

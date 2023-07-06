import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { runSchema } from "./db/schema";

import { useIO } from "./routes/sockets";

const app = express();

const socketServer = createServer(app);
const io = new Server(socketServer, {
    cors: {
        origin: "*",
    },
});

runSchema();

useIO(io);

app.get("/test", (req, res) => {
    res.send("up");
});

export { app, socketServer, io };

// import express from 'express';
import { app, socketServer } from './app';
import { config } from 'dotenv';

config();

const port = process.env.PORT || 3000;
const socket = process.env.SOCKET || 8000;

socketServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// import express from 'express';
import { app, socketServer } from "./app";
import { config } from "dotenv";
import testRoutes from "./routes/testRoutes";

config();

const port = process.env.PORT || 3000;
const socket = process.env.SOCKET || 8000;

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    app.use("/test", testRoutes);
}

socketServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

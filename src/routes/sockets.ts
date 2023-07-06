// attach events to the socket server
function useIO(ws) {
    ws.on("connection", (socket) => {
        console.log("client up", socket.id);

        // test event
        socket.on("echo", (message) => {
            socket.emit("echo", message);
        });

        socket.on("error", (err) => {
            console.log(err);
        });
    });

    ws.on("disconnect", () => {
        console.log("a user disconnected");
    });

    ws.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}

export { useIO };

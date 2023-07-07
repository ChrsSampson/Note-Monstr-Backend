// attach events to the socket server
import User from "../db/User";

function useIO(ws) {
    ws.on("connection", (socket) => {
        console.log("client up", socket.id);

        // test event
        socket.on("echo", (message) => {
            socket.emit("echo", message);
        });

        socket.on("sign-up", async (data, callback) => {
            try {
                const user = await User.create(data);
                if (user) {
                    callback(user);
                }
            } catch (err) {
                callback({ error: err.message });
            }
        });

        socket.on("user-login", (data) => {
            console.log("login Event", data);
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

const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

// http & socket port
const server = http.createServer();
const socket_port = 3005;
server.listen(socket_port, () => console.log(`server socket listening on Port:${socket_port}`));
const io = socketio(server, {
    cors: {
        origin: "*",
    },
});

// api port
const app = require("express")();
const api_port = 3006;
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.listen(api_port, () => console.log(`api listening on Port:${api_port}`));

// api
app.get("/api/message", (req, res) => {
    const messages = "Hello";
    res.send(messages);
});

// socket
io.on("connection", (socket) => {
    console.log(`client ${socket.id} is connected`);
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} is disconnected`);
    });
    socket.on("hello", (message) => {
        console.log(`receive message: ${message}`);
        io.to(socket.id).emit("serverMessage", `Hello, ${message}, nice to meet you`)
    });
});

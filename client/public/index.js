const socket = io("http://localhost:3005");

socket.on("serverMessage", (msg) => {
    console.log(`server message: ${msg}`);
});

document.getElementById("send-btn").onclick = () => {
    socket.emit("hello", document.getElementById("name").value);
};

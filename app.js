// Modulos
const SocketIO = require("socket.io");
const path = require("path");
const express = require("express");

// Servidor
const app = express();
// Configuracion
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`http://127.0.0.1:${PORT}`);
    console.log(`http://192.168.0.9:${PORT}`);
});

const io = SocketIO(server);

// WebSockets
io.on("connection", (socket) => {
    console.log(`Nueva conexión: ${socket.id}`);

    socket.on("chat:message", (data) => {
        io.sockets.emit("chat:message", data);
    });

    socket.on("chat:escribiendo", (data) => {
        if (data.username == "") {}
        socket.broadcast.emit("chat:escribiendo", data);
    });

    socket.on("chat:escribiendo:stop", () => {
        socket.broadcast.emit("chat:escribiendo:stop")
    })
});

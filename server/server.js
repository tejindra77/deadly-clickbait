const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {};

io.on("connection", (socket) => {
    console.log("New player connected: " + socket.id);
    players[socket.id] = { x: 0, y: 1, z: 0, color: getRandomColor() };

    socket.emit("newPlayer", { id: socket.id, color: players[socket.id].color });
    io.emit("updatePositions", players);

    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("updatePositions", players);
    });

    socket.on("move", (data) => {
        if (players[socket.id]) {
            players[socket.id].x += data.x;
            players[socket.id].z += data.z;
        }
        io.emit("updatePositions", players);
    });
});

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

server.listen(3000, () => console.log("Server running on port 3000"));


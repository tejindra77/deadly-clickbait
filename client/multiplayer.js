const socket = io();

// Handle new players
socket.on("newPlayer", (data) => {
    addPlayer(data.id, data.color);
});

// Handle position updates
socket.on("updatePositions", (data) => {
    for (let id in data) {
        if (players[id]) {
            players[id].position.x = data[id].x;
            players[id].position.z = data[id].z;
        }
    }
});


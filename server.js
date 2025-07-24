const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let rooms = {}; // { roomId: [socketId1, socketId2] }

io.on("connection", (socket) => {
    console.log("A player connected:", socket.id);

    // Join a room or create new one
    let joined = false;
    for (let roomId in rooms) {
        if (rooms[roomId].length < 2) {
            rooms[roomId].push(socket.id);
            socket.join(roomId);
            socket.emit("joinedRoom", roomId);
            io.to(roomId).emit("startGame", { roomId });
            joined = true;
            break;
        }
    }

    if (!joined) {
        const newRoomId = `room-${socket.id}`;
        rooms[newRoomId] = [socket.id];
        socket.join(newRoomId);
        socket.emit("waitingForPlayer", newRoomId);
    }

    // Handle player move
    socket.on("makeMove", ({ roomId, move }) => {
        socket.to(roomId).emit("moveMade", move);
    });

    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);
        // Remove from rooms
        for (let roomId in rooms) {
            rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
            if (rooms[roomId].length === 0) delete rooms[roomId];
        }
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});



const socket = io("http://localhost:3000");

socket.on("joinedRoom", (roomId) => {
    console.log("Joined Room:", roomId);
});

socket.on("waitingForPlayer", (roomId) => {
    console.log("Waiting for another player in", roomId);
});

socket.on("startGame", (data) => {
    console.log("Game Started in Room:", data.roomId);
});

// On making a move
function onCellClick(cellIndex) {
    const move = { cell: cellIndex, player: "X" }; // or "O"
    socket.emit("makeMove", { roomId: currentRoomId, move });
}

socket.on("moveMade", (move) => {
    updateBoard(move.cell, move.player); // your custom function
});


// Inside io.on("connection")
let joined = false;
for (let roomId in rooms) {
    if (rooms[roomId].length < 2) {
        rooms[roomId].push(socket.id);
        socket.join(roomId);
        const playerIndex = rooms[roomId].indexOf(socket.id);
        const role = playerIndex === 0 ? "X" : "O";
        socket.emit("joinedRoom", { roomId, role });
        if (rooms[roomId].length === 2) {
            io.to(roomId).emit("startGame", { roomId });
        }
        joined = true;
        break;
    }
}

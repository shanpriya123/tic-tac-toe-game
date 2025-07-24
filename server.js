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

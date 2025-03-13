"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socketHandler = (app) => {
    const io = new socket_io_1.Server(app);
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('eventUpdate', (data) => {
            io.emit('eventUpdate', data);
        });
        socket.on('tradeUpdate', (data) => {
            io.emit('tradeUpdate', data);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
exports.default = socketHandler;

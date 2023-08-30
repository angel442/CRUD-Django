import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import mongoose from 'mongoose';
import { DotenvConfigOptions } from 'dotenv';

const app = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

io.on('connection', socket => {
    console.log("client connected");

    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('message', {from: socket.id, msg: data});
    })


})


app.disable('x-powered-by');

const PORT = process.env.PORT ?? 3000;
server.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
})


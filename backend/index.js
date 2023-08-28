import express from 'express';
import { http } from 'http';
import { Server as SocketServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);



app.disable('x-powered-by');

const PORT = process.env.PORT ?? 3000;
server.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
})

app.use((req, res) => {
    res.send('<h1>Server works</h1>');
})

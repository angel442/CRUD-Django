import authRoutes from './routes/authRoutes.js';
import { connectDB } from './db.js';
import Message from './models/message.model.js';
import 'dotenv/config';

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import WebSocket, { WebSocketServer } from "ws";

import jwt from 'jsonwebtoken'; //TODO delete in the future and remplase for jwtVerify
import 'dotenv/config';         //TODO delete in the future and remplase for jwtVerify

const app = express();


app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use(express.json());
app.use(cookieParser());
 
app.use('/api', authRoutes);

connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`server listening on port http://localhost:${process.env.PORT}`);
})


//TODO set in a new file

// read username and id from the cookie for this connection
const wss = new WebSocketServer({ server });
wss.on('connection', (connection, req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
        const tokenCookiesStr = cookies.split(';').find(str => str.startsWith('token='));

        if (tokenCookiesStr) {
            const token = tokenCookiesStr.split('=')[1];
            
            if (token) {
                jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, userData) => {
                    if (err) throw err;
                    connection.userId = userData.id;
                    connection.username = userData.username;
                });
            }
        }
    }

    // handler message
    connection.on('message', async (message) => {
        const messageData = JSON.parse(message.toString());
        const {recipient, text} = messageData;
        if (recipient && text) {

            const messageDoc = await Message.create({
                sender: connection.userId,
                recipient: recipient,
                text: text
            });

            [...wss.clients]
                .filter(c => c.userId === recipient)
                .forEach(c => c.send(JSON.stringify({
                    text, 
                    sender: connection.userId,
                    recipient,
                    id: messageDoc._id
                })));
        }
    });

    // notify everyone about online people (when someone connects)
    [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
            online: [...wss.clients].map(c => ({userId: c.userId, username: c.username}))
        }
        ));
    })

});
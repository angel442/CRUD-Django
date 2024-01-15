import authRoutes from './routes/authRoutes.js';
import { connectDB } from './db.js';
import 'dotenv/config';

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`server listening on port http://localhost:${process.env.PORT}`);
})

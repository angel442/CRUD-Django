import express from "express";
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import cookies from "cookie-parser";


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookies());
app.use('/api', authRoutes);


export default app;
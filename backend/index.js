import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db.js';

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`server listening on port http://localhost:${process.env.PORT}`);
})
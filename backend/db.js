import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
    try {
        const connectionParams={
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }
        await mongoose.connect(process.env.URL_DB, connectionParams);
        console.log("-->DB connected");
    } catch (error) {
        console.error(`Error connecting to the database. Error: ${ error }`);
    }
};


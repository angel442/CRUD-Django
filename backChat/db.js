import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
	try {
	    
	    await mongoose.connect(process.env.URL_DB);
	    console.log("-->DB connected");
	} catch (error) {
	    console.error(`Error connecting to the database. Error: ${ error }`);
	}
};

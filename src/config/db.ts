import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || ""

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }as mongoose.ConnectOptions);

        console.log("MongoDB Connected Successfully")
    }catch(error){
        console.error("MongoDB connection failed: ", error);
        process.exit(1);
    }
}

export default connectDB;
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        // Connecting to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;
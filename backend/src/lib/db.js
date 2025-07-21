import mongoose from 'mongoose'; // MongoDB object modeling tool

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb Connected: ${conn.connection.host}`); // Log the host of the connected database
    } catch (error) {
        console.log("Error connecting to Mongodb", error); // Log the error if connection fails
        process.exit(1); // Exit the process with failure code
    }
}
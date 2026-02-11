import mongoose from "mongoose";

// const uri = process.env.MONGODB_URI as string;

export async function initDatabase() {
    const DATABASE_URL = process.env.DATABASE_URL as string;
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("MongoDB connected via Mongoose at:", DATABASE_URL);
    } catch (error) {
        console.error("Mongoose connection error", error);
        process.exit(1);
    }
}

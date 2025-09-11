import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


export default async function connectDB() {
    const URI = process.env.URI ||'No string ';
        console.log(URI)
    await mongoose.connect(URI, {
        dbName: "IMS"
    })
} 
// import mongoose from "mongoose";
import { MongoClient } from "mongodb"
import "dotenv/config"

// Create a new MongoClient

const database = async (database_name = "attendance") => {
    const client = new MongoClient(`mongodb+srv://attendance_app:${process.env.MONGO_PASSWORD}@cluster0.60xed1f.mongodb.net/${database_name}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect().then(() => console.log("Connection success. Using database: ", database_name)).catch((err) => console.log("Connection failed: " + err));
    return client.db();
}

export default database;
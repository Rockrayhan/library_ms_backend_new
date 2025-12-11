import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let server: Server;

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}

main();

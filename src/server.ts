import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

let server: Server;

const PORT = 5000;

async function main() {
  try {
    // await mongoose.connect(
    //   "mongodb+srv://hrittik:IaaD9NfGIeeJ2v1A@cluster0.tkzq2fj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    // );

    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB Using Mongoose!!");
    server = app.listen(PORT, () => {
      console.log(`Library Management Backend is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

import mongoose from "mongoose";

export default async function db() {
  if (mongoose.connections.readyState >= 1) {
    return;
  }

  const DATABASE = process.env.DATABASE;

  if (!DATABASE) {
    throw new Error("Please define the DATABASE environment variable");
  }

  try {
    await mongoose.connect(DATABASE);
    console.log("Connected to database");
  } catch (err) {
    console.log("Connection error", err);
  }
}

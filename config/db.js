import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const { bgGreen, white, red } = colors;

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log(
      bgGreen(white(`Connection is successful: ${mongoose.connection.host}`))
    );
  } catch (error) {
    console.log(red(`Error connecting to database: ${error.message}`));
    process.exit(1); // Exit the process if the database connection fails
  }
};

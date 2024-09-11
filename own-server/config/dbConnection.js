import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECT_STRING);
  } catch (error) {
    console.log("error: ", error);
    process.exit(1);
  }
};

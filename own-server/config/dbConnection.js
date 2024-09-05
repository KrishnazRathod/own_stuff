import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECT_STRING);
  } catch (error) {
    console.log("error: ", error);
    process.exit(1);
  }
};

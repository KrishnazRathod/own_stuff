import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "..//models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const returnResult = (res, data) => {
  return res.status(200).json(data);
};

const returnError = (res, message) => {
  return res.status(404).json({ message });
};

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  returnResult(res, users);
});

export const userRegister = asyncHandler(async (req, res) => {
  const { username, email, phone, password } = req.body;
  if (!username || !email || !phone || !password) {
    returnError(res, "All fields are mandetory");
    throw new Error("All fields are mandetory");
  } else {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      returnError(res, "User already registered");
      throw new Error("User already registered");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      phone,
      password: hashPassword,
    });
    if (user) {
      returnResult(res, user);
    } else {
      returnError(res, "something is wrong");
      throw new Error("User Data is invalid");
    }
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  const { username, email, phone, password } = req.body;
  if (!username || !email || !phone || !password) {
    returnError(res, "All fields are mandetory");
    throw new Error("All fields are mandetory");
  } else {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "500000m",
        }
      );
      returnResult(res, accessToken);
    } else {
      returnError(res, "password is invalid");
      throw new Error("password is invalid");
    }
  }
});

export const currentUser = asyncHandler(async (req, res) => {
  console.log(" currentUser");
});

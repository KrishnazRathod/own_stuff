import asynchandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const validateToken = asynchandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("user is not authorization");
      } else {
        req.user = decoded.user;
        next();
      }
    });
    if (!token) {
      res.status(401);
      throw new Error("token is not valid");
    }
  }
});

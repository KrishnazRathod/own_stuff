import express from "express";
import dotenv from "dotenv";
import notesRoute from "./routes/notesRoute.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import { connectDb } from "./config/dbConnection.js";

connectDb();

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/notes", notesRoute);
app.use("/api/users", userRoute);
app.listen(PORT, () => {
  console.log("PORT:", PORT);
});

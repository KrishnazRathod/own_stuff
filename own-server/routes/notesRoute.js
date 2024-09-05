import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controller/notesController.js";

const router = express.Router();

router
  .get("/notes", getAllNotes)
  .post("/note", createNote)
  .put("/note/:id", updateNote)
  .delete("/note/:id", deleteNote);

export default router;

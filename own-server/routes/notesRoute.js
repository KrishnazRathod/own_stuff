import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controller/notesController.js";
import { validateToken } from "../middleware/validateTokenhandler.js";

const router = express.Router();

router.use(validateToken);

router
  .get("/", getAllNotes)
  .get("/:id", getNote)
  .post("/", createNote)
  .put("/:id", updateNote)
  .delete("/:id", deleteNote);

export default router;

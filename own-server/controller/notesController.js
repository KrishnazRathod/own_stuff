import asyncHandler from "express-async-handler";
import Notes from "..//models/notesModel.js";

const returnResult = (res, data) => {
  return res.status(200).json(data);
};

const returnError = (res, message) => {
  return res.status(404).json({ message });
};

const unauthorizedMessage = (res, message) => {
  return res.status(404).json({ message });
};

export const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find();
  if (!notes) {
    returnError(res, "No notes found");
    throw new Error("not found");
  }
  returnResult(res, notes);
});
export const getNote = asyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);
  // console.log("note.user_id:", note);
  // if (note.user_id.toString() !== req.user.id) {
  //   unauthorizedMessage(res, "unauthorized");
  //   throw new Error("unauthorized");
  // }
  if (!note) {
    returnError(res, "No notes found");
    throw new Error("not found");
  }
  returnResult(res, note);
});

export const createNote = asyncHandler(async (req, res) => {
  const { heading, note, isArchive, isTrash } = req.body;
  // console.log("req:", req);
  console.log("req:...", req.user.id);
  // console.log("req.body.user_id: ", req.body.user_id);
  // if (req.body.user_id.toString() !== req.user.id) {
  //   unauthorizedMessage(res, "unauthorized");
  //   throw new Error("unauthorized");
  // }
  if (
    heading === undefined ||
    note === undefined ||
    isArchive === undefined ||
    isTrash === undefined
  ) {
    returnError(res, "Missing required fields");
    throw new Error("Missing required fields");
  } else {
    const newNote = await Notes.create({
      heading,
      isArchive,
      isTrash,
      note,
      user_id: req.user.id,
    });
    returnResult(res, newNote);
  }
});

export const updateNote = asyncHandler(async (req, res) => {
  const updateNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  console.log("updateNote:", updateNote);
  if (updateNote.user_id.toString() !== req.user.id) {
    unauthorizedMessage(res, "unauthorized");
    throw new Error("unauthorized");
  } 
  //   if (!notes) {
  //     returnError(res, "No notes found");
  //     throw new Error("not found");
  //   }
  returnResult(res, updateNote);
});

export const deleteNote = asyncHandler(async (req, res) => {
  await Notes.deleteOne({ _id: req.params.id });
  // if (req.body.user_id.toString() !== req.user.id) {
  //   unauthorizedMessage(res, "unauthorized");
  //   throw new Error("unauthorized");
  // }
  //   if (!notes) {
  //     returnError(res, "No notes found");
  //     throw new Error("not found");
  //   }
  returnResult(res, "deleted");
});

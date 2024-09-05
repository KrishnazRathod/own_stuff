import asyncHandler from "express-async-handler";
import Notes from "..//models/notesModel.js";

const returnResult = (res, data) => {
  return res.status(200).json(data);
};

const returnError = (res, message) => {
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
  if (!notes) {
    returnError(res, "No notes found");
    throw new Error("not found");
  }
  returnResult(res, notes);
});

export const createNote = asyncHandler(async (req, res) => {
  const { heading, note, isArchive, isTrash } = req.body;
  if (
    heading === undefined ||
    note === undefined ||
    isArchive === undefined ||
    isTrash === undefined
  ) {
    returnError(res, "Missing required fields");
    throw new Error("Missing required fields");
  } else {
    const newNote = await Notes.create({ heading, isArchive, isTrash, note });
    returnResult(res, newNote);
  }
});

export const updateNote = asyncHandler(async (req, res) => {
  const updateNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  //   if (!notes) {
  //     returnError(res, "No notes found");
  //     throw new Error("not found");
  //   }
  returnResult(res, updateNote);
});

export const deleteNote = asyncHandler(async (req, res) => {
  await Notes.deleteOne({ _id: req.params.id });
  //   if (!notes) {
  //     returnError(res, "No notes found");
  //     throw new Error("not found");
  //   }
  returnResult(res, "deleted");
});

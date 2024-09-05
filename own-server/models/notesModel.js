import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    isArchive: {
      type: Boolean,
      required: false,
    },
    isTrash: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("note", notesSchema);

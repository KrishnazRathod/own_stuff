import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Note",
    },
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

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter name"],
    },
    email: {
      type: String,
      required: [true, "please enter email"],
    },
    phone: {
      type: Number,
      required: [true, "please enter phone no."],
    },
    password: {
      type: String,
      required: [true, "please enter password"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);

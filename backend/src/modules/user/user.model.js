import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: Number,
    },
    role: {
      type: String,
      default: "user", // Sets the default value to 'active'
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", UserSchema);

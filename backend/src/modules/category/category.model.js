import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "active", // Sets the default value to 'active'
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Category", CategorySchema);

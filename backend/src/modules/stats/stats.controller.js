import * as service from "./stats.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";

export const getSummary = asyncHandler(async (req, res) => {
  try {
    const {
      year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
    } = req.query;
    const result = await service.getSummary({
      year,
      month,
      userId: String(req.user._id),
    });
    res.status(200).json(result);
  } catch (error) {
    console.log("Server Error", error);
    throw new AppError("Server error", 500);
    // res.status(500).json({ message: "Server error" });
  }
});

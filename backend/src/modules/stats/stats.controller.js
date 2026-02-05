import * as service from "./stats.service.js";

export const getSummary = async (req, res) => {
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
    res.status(500).json({ message: "Server error" });
  }
};

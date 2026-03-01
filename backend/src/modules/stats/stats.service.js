import Transaction from "../transaction/transaction.model.js";
import { statsValidationSchema } from "../stats/stats.validation.js";
import mongoose from "mongoose";

export const addTransaction = async (data) => {
  try {
    const { error, value } = statsValidationSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const newTransaction = await Transaction.create({
      ...value,
    });
    return newTransaction;
  } catch (error) {
    console.error("Error adding transaction:", error.message);
    throw error;
  }
};

export const getSummary = async (data) => {
  try {
    const { error, value } = statsValidationSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { year, month, userId } = value;

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 1);

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const summary = await Transaction.aggregate([
      {
        $match: {
          userId: userObjectId,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },

      {
        $facet: {
          totalsByType: [
            {
              $group: {
                _id: "$type",
                totalAmount: { $sum: "$amount" },
              },
            },
          ],
          totalAmount: [
            {
              $group: {
                _id: null,
                total: { $sum: "$amount" },
              },
            },
          ],
          totalsByCategory: [
            {
              $group: {
                _id: "$categoryId",
                totalAmount: { $sum: "$amount" },
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $unwind: "$category",
            },
            {
              $project: {
                _id: 0,
                categoryId: "$category._id",
                categoryName: "$category.name",
                totalAmount: 1,
              },
            },
          ],
        },
      },
    ]);

    return summary[0];
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    throw error;
  }
};

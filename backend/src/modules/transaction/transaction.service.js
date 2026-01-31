import Transaction from "./transaction.model.js";

import { transactionValidationSchema } from "./transaction.validation.js";

export const addTransaction = async (data) => {
  try {
    const { error, value } = transactionValidationSchema.validate(data);
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

export const transactionsList = async ({ page, limit, filters }) => {
  try {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Transaction.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Transaction.countDocuments(filters),
    ]);
    return {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.log("Error fetching transaction:", error.message);
    throw error;
  }
};

export const updateTransaction = async ({ id, data }) => {
  try {
    const updatedData = await Transaction.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedData;
  } catch (error) {
    console.log("Error updating transaction:", error.message);
    throw error;
  }
};

export const deleteTransaction = async ({ id }) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    return deletedTransaction;
  } catch (error) {
    console.log("Error deleting transaction:", error.message);
    throw error;
  }
};

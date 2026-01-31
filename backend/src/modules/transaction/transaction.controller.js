import * as service from "./transaction.service.js";

export const addTransaction = async (req, res) => {
  const transaction = await service.addTransaction({
    ...req.body,
    userId: String(req.user._id),
  });
  res.status(201).json(transaction);
};

export const transactionsList = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    month = "",
    year = "",
    date = "",
    categoryId = "",
  } = req.query;
  // Build filters
  const filters = {
    userId: String(req.user._id),
  };
  if (categoryId) {
    filters.categoryId = categoryId;
  }
  // Handle date filters
  if (year || month || date) {
    const start = new Date();
    const end = new Date();

    if (year && month && date) {
      // Exact date
      start.setFullYear(year, month - 1, date);
      start.setHours(0, 0, 0, 0);
      end.setFullYear(year, month - 1, date);
      end.setHours(23, 59, 59, 999);
    } else if (year && month) {
      // Whole month
      start.setFullYear(year, month - 1, 1);
      start.setHours(0, 0, 0, 0);
      end.setFullYear(year, month, 0); // last day of month
      end.setHours(23, 59, 59, 999);
    } else if (year) {
      // Whole year
      start.setFullYear(year, 0, 1);
      start.setHours(0, 0, 0, 0);
      end.setFullYear(year, 11, 31);
      end.setHours(23, 59, 59, 999);
    }

    filters.date = { $gte: start, $lte: end };
  }
  // console.log(filters, "filterss");
  const transactionsList = await service.transactionsList({
    page: Number(page),
    limit: Number(limit),
    filters,
  });
  res.status(200).json(transactionsList);
};

export const updateTransaction = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await service.updateTransaction({ id, data });
  res.status(200).json(result);
};

export const deleteTransaction = async (req, res) => {
  const id = req.params.id;
  const deletedTransaction = await service.deleteTransaction({ id });
  res.status(200).json(deletedTransaction);
};

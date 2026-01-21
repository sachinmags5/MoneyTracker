import * as service from "./category.service.js";

export const category = async (req, res) => {
  const category = await service.category(req.body);
  res.status(201).json(category);
};

export const categoryList = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const categoryList = await service.categoryList({
    page: Number(page),
    limit: Number(limit),
    search,
  });
  res.status(200).json(categoryList);
};

export const updateCategory = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await service.updateCategory({ id, data });
  res.status(200).json(result);
};

export const deleteCategory = async (req, res) => {
  const id = req.params.id;
  const deletedCategory = await service.deleteCategory({ id });
  res.status(200).json(deletedCategory);
};

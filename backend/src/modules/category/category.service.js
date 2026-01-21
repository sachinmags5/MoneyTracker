import Category from "./category.model.js";
import { categoryValidationSchema } from "./category.validation.js";

export const category = async (data) => {
  try {
    const { error, value } = categoryValidationSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const newCategory = await Category.create({
      ...value,
    });
    return newCategory;
  } catch (error) {
    console.error("Error Creating category:", error.message);
    throw error;
  }
};

export const categoryList = async ({ page, limit, search }) => {
  try {
    const query = search
      ? { name: { $regex: search, $options: "i" }, status: "active" }
      : { status: "active" };
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Category.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Category.countDocuments(query),
    ]);
    return {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.log("Error fetching category:", error.message);
    throw error;
  }
};

export const updateCategory = async ({ id, data }) => {
  try {
    const updatedData = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedData;
  } catch (error) {
    console.log("Error updating category:", error.message);
    throw error;
  }
};

export const deleteCategory = async ({ id }) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
  } catch (error) {
    console.log("Error deleting category:", error.message);
    throw error;
  }
};

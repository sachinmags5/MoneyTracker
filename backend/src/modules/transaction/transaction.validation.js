import Joi from "joi";

export const transactionValidationSchema = Joi.object({
  amount: Joi.number().min(1).max(100000).required(),
  type: Joi.string().required(),
  categoryId: Joi.string().required(),
  userId: Joi.string().required(),
  note: Joi.string().min(3).max(100),
});

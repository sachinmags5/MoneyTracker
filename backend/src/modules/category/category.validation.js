import Joi from "joi";

export const categoryValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  type: Joi.string().required(),
  userId: Joi.string().required(),
  description: Joi.string().min(3).max(100),
});

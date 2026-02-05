import Joi from "joi";

export const statsValidationSchema = Joi.object({
  year: Joi.number().min(1996).max(2026).required(),
  month: Joi.number().min(1).max(12).required(),
  userId: Joi.string(),
});

import User from "./user.model.js";
import bcrypt from "bcrypt";
import { userValidationSchema } from "./transaction.validation.js";

export const registerUser = async (data) => {
  try {
    const { error, value } = userValidationSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(value.password, 10);
    const newUser = await User.create({
      ...value,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};

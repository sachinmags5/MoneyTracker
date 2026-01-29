import User from "./user.model.js";
import bcrypt from "bcrypt";
import {
  userValidationSchema,
  loginValidationSchema,
} from "./user.validation.js";
import { signToken } from "../../utils/jwt.js";

export const registerUser = async (data) => {
  try {
    const { error, value } = userValidationSchema.validate(data);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
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

export const loginUser = async (data) => {
  try {
    const { error, value } = loginValidationSchema.validate(data);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      throw new Error(error.details[0].message);
    }
    const userData = await User.findOne({ email: value.email });
    if (userData) {
      const match = await bcrypt.compare(value.password, userData.password);
      if (!match) {
        throw new Error("Invalid credentials");
      }
      let userDataObj = userData.toObject();
      delete userDataObj.password;
      const token = signToken(userDataObj);
      console.log(token, "token");
      console.log(userDataObj, "userDataObj");
      return { ...userDataObj, token };
    } else {
      return {
        message: "Invalid User email.",
      };
    }
  } catch (error) {
    console.error("Error Logging user:", error.message);
    throw error;
  }
};

export const getMe = async (data) => {
  try {
    const user = await User.findById(data._id).select("-password");
    if (!user) {
      return { message: "User not found" };
    }
    return user;
  } catch (error) {
    console.error("Cannot find user:", data._id, error.message);
    throw error;
  }
};

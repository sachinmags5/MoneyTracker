import User from "./user.model.js";
import bcrypt from "bcrypt";
import {
  userValidationSchema,
  loginValidationSchema,
} from "./user.validation.js";
import {
  refreshToken1,
  signToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";

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
  const { error, value } = loginValidationSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const user = await User.findOne({ email: value.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(value.password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  // ✅ Minimal payload
  const payload = {
    id: user._id,
    name: user.name,
    role: user.role,
  };

  const access_token = signToken(payload);
  const refreshToken = refreshToken1({ id: user._id });

  // ✅ Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: payload,
    access_token,
    refreshToken, // controller sets this in cookie only
  };
};

export const refreshToken = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new Error("Refresh token missing");
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error("Invalid refresh token");
  }

  // ✅ Verify refresh token
  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded || decoded.id !== String(user._id)) {
    throw new Error("Invalid refresh token");
  }

  // ✅ Minimal payload
  const payload = {
    id: user._id,
    name: user.name,
    role: user.role,
  };

  const newAccessToken = signToken(payload);
  const newRefreshToken = refreshToken1({ id: user._id });

  // ✅ Rotate refresh token
  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    token: newAccessToken,
    newRefreshToken,
  };
};

export const getMe = async ({ id }) => {
  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const logout = async ({ refreshToken }) => {
  if (!refreshToken) return null;

  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  return true;
};

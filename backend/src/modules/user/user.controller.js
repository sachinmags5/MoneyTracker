import * as service from "./user.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";
import logger from "../../config/logger.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body; // Basic validation (you can replace with Joi/express-validator for stronger checks)
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const result = await service.registerUser(req.body);
  res.status(201).json(result);
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await service.loginUser({ email, password });

  logger.info(`Login attempt: ${email}`);

  if (result?.token?.message) {
    throw new AppError(result.token.message, 401);
  }

  // ✅ Set ONLY refresh token as httpOnly cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    secure: true, // MUST be true in production
    sameSite: "none", // MUST be "none" for cross-domain
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  logger.info(`User logged in: ${email}`);

  // ✅ Return access token in JSON (NOT cookie)
  return res.status(200).json({
    user: {
      id: result.user.id,
      name: result.user.name,
      role: result.user.role,
    },
    access_token: result.access_token,
    message: "Login successful",
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  const result = await service.refreshToken({
    refreshToken: incomingRefreshToken,
  });

  if (!result) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  if (result?.token?.message) {
    throw new AppError(result.token.message, 401);
  }

  // ✅ Rotate refresh token (security best practice)
  res.cookie("refreshToken", result.newRefreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    secure: true, // MUST be true in production
    sameSite: "none", // MUST be "none" for cross-domain
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // ✅ Return ONLY new access token
  return res.status(200).json({
    access_token: result.token,
    message: "Token refreshed successfully",
  });
});

export const getMe = async (req, res) => {
  try {
    const result = await service.getMe(req.user);
    res.status(200).json(result);
  } catch (error) {
    throw new AppError("Server error", 500);
    // res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  const result = await service.logout({ refreshToken });

  res.clearCookie("refreshToken");
  res.status(200).json({ ...result, message: "Logged out successfully" });
};

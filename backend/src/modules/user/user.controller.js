import * as service from "./user.service.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body; // Basic validation (you can replace with Joi/express-validator for stronger checks)
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const result = await service.registerUser(req.body);
  res.status(201).json(result);
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await service.loginUser({ email, password });

    // If loginUser returned an error message inside token
    if (result?.token?.message) {
      return res.status(401).json({ message: result.token.message });
    }

    // Set secure cookie with JWT
    res.cookie("access_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      ...result,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(401).json({ message: error.message || "Login failed" });
  }
};

export const getMe = async (req, res) => {
  try {
    const result = await service.getMe(req.user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0), // immediately expire
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

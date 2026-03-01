import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET = process.env.REFRESH_SECRET;
const JWT_EXPIRES_IN = "1m";
const JWT_REFRESH_EXPIRES_IN = "1d";

export const signToken = (payload) => {
  const { id, name, role } = payload;
  return jwt.sign({ id, name, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const refreshToken1 = (payload) => {
  const { id, name, role } = payload;
  return jwt.sign({ id, name, role }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

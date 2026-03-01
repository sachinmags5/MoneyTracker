import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
  try {
    // const token = req.cookies?.access_token;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = verifyToken(token);

    req.user = decoded; // attach user to request

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

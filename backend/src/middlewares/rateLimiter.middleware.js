import rateLimit from "express-rate-limit";

/**
 * General API limiter
 * 100 requests per 15 minutes per IP
 */
export const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 mins
  max: 5, // limit each IP
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false,
});

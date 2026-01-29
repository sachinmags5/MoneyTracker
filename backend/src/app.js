import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./modules/user/user.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";
const app = express();

// Allow requests from your frontend (http://localhost:5173) app.use(cors({ origin: "http://localhost:5173", // frontend URL methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/category", authenticate, categoryRoutes);

export default app;

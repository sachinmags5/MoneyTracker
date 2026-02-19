import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRoutes from "./modules/user/user.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import transactionRoutes from "./modules/transaction/transaction.routes.js";
import statsRoutes from "./modules/stats/stats.routes.js";
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
// app.use(helmet());
//to remove  x-powered-by
app.disable("x-powered-by");
app.use(
  helmet({
    xPoweredBy: false,
  }),
);
app.set("trust proxy", 1);

app.use("/api/users", userRoutes);
app.use("/api/category", authenticate, categoryRoutes);
app.use("/api/transaction", authenticate, transactionRoutes);
app.use("/api/stats", authenticate, statsRoutes);

export default app;

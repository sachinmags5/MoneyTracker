import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRoutes from "./modules/user/user.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import transactionRoutes from "./modules/transaction/transaction.routes.js";
import statsRoutes from "./modules/stats/stats.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import requestLogger from "./middlewares/requestLogger.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

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

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//winston Logger
app.use(requestLogger);

//my routes
app.use("/api/users", userRoutes);
app.use("/api/category", authenticate, categoryRoutes);
app.use("/api/transaction", authenticate, transactionRoutes);
app.use("/api/stats", authenticate, statsRoutes);

// 404 handler
app.use((req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// CENTRAL ERROR HANDLER (always last)
app.use(errorMiddleware);

export default app;

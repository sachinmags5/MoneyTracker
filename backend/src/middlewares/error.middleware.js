const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    err.message = "Duplicate field value";
    err.statusCode = 400;
  }

  if (err.name === "CastError") {
    err.message = "Invalid ID";
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;

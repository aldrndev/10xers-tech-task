const errorHandler = (error, req, res, next) => {
  let message = "Internal Server Error";
  let statusCode = 500;

  if (error.message === "forbidden") {
    statusCode = 403;
    message = "Only admin can access this resources";
  }

  if (error.message === "product_not_found") {
    statusCode = 404;
    message = "No product found";
  }

  if (
    error.message === "user_not_found" ||
    error.message === "password_not_match"
  ) {
    statusCode = 401;
    message = "Invalid Email/Password";
  }

  if (error.message === "email_password_required") {
    message = "Please provide email and password";
    statusCode = 400;
  }

  if (error.name === "JsonWebTokenError" || error.message === "unathorized") {
    message = "Please login first to your account";
    statusCode = 401;
  }

  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeDatabaseError"
  ) {
    message = error.errors[0].message;
    statusCode = 400;
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token Expired";
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;

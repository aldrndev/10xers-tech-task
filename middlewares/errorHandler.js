const errorHandler = (err, req, res, next) => {
  let message = "Internal Server Error";
  let statusCode = 500;

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;

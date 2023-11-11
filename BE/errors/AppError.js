const errorMessages = require("../constants/error_msg");

class AppError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message || errorMessages.INTERNAL_SERVER_ERROR;
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

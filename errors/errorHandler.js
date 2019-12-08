const errorMessages = require('../configurations/response-messages');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorMessages.SERVER_ERR
        : message,
    });
  next();
};

module.exports = errorHandler;

const NotFoundError = require('../errors/not-found-error');
const errorMessages = require('../configurations/response-messages');

const wrongPage = (req, res, next) => {
  next(new NotFoundError(errorMessages.NOT_FOUND_ERR));
};

module.exports = wrongPage;

const NotFoundError = require('../errors/not-found-error');

const wrongPage = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};

module.exports = wrongPage;

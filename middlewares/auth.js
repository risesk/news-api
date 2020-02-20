const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { DEV_SECRET } = require('../configurations/secret-dev-key');

const errorMessages = require('../configurations/response-messages');

const { NODE_ENV, JWT_SECRET } = process.env;

const secretkey = NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!req.cookies.jwt && (!authorization || !authorization.startsWith('Bearer'))) {
    throw new UnauthorizedError(errorMessages.NOT_AUTH_ERR);
  }

  const token = req.cookies.jwt || authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretkey);
  } catch (err) {
    next(new UnauthorizedError(errorMessages.NOT_AUTH_ERR));
  }

  req.user = payload;
  next();
};

module.exports = { auth, secretkey };

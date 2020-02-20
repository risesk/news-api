const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretkey } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const errorMessages = require('../configurations/response-messages');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.NO_USER_ERROR);
      }
      return res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const modifiedUser = user.toObject();
      delete modifiedUser.password;
      delete modifiedUser._id;
      res.send(modifiedUser);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new UnauthorizedError(errorMessages.NON_UNIQUE_USER_ERROR));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        secretkey,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 3600,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

const logout = (req, res) => {
  res
    .status(200)
    .clearCookie('jwt', {
      httpOnly: true,
      sameSite: true,
    })
    .end();
};

module.exports = {
  getUser,
  createUser,
  login,
  logout,
};

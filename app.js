require('dotenv').config();
require('./database/mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const limiter = require('./configurations/rate-limit');

const corsChecker = require('./middlewares/corsChecker');

const router = require('./routes');
const { login, createUser, logout } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./errors/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(corsChecker);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
app.post('/logout', logout);
app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

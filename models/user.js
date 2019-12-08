const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const errorMessages = require('../configurations/response-messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => errorMessages.NOT_EMAIL_ERR,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(errorMessages.WRONG_AUTH_DATA_ERR));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(errorMessages.WRONG_AUTH_DATA_ERR));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

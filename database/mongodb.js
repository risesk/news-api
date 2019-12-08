const mongoose = require('mongoose');
const { DB_ADDRESS_DEV } = require('../configurations/db-address');

const { NODE_ENV, DB_ADDRESS_PROD } = process.env;

const DB_ADDRESS = NODE_ENV === 'production' ? DB_ADDRESS_PROD : DB_ADDRESS_DEV;

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

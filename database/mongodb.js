const mongoose = require('mongoose');

const { NODE_ENV, DB_ADDRESS_PROD } = process.env;
const DB_ADDRESS = NODE_ENV === 'production' ? DB_ADDRESS_PROD : 'mongodb://localhost:27017/newsdb';

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

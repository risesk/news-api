const cors = require('cors');
const allowedDomains = require('../configurations/config');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const corsChecker = cors(corsOptions);

module.exports = corsChecker;

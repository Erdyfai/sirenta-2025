const cors = require('cors');

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;

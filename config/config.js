const dotenv = require('dotenv');
dotenv.config();
const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI 

}

module.exports = config

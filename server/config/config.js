require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: "mysql",
    pool: {
      max: parseInt(process.env.DEV_DB_POOL_MAX),
      min: parseInt(process.env.DEV_DB_POOL_MIN),
      acquire: parseInt(process.env.DEV_DB_POOL_ACQUIRE),
      idle: parseInt(process.env.DEV_DB_POOL_IDLE),
    }
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect: "mysql",
    pool: {
      max: parseInt(process.env.TEST_DB_POOL_MAX),
      min: parseInt(process.env.TEST_DB_POOL_MIN),
      acquire: parseInt(process.env.TEST_DB_POOL_ACQUIRE),
      idle: parseInt(process.env.TEST_DB_POOL_IDLE),
    }
  },
  production: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: "mysql",
    pool: {
      max: parseInt(process.env.DEV_DB_POOL_MAX),
      min: parseInt(process.env.DEV_DB_POOL_MIN),
      acquire: parseInt(process.env.DEV_DB_POOL_ACQUIRE),
      idle: parseInt(process.env.DEV_DB_POOL_IDLE),
    }
  }
};

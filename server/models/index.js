'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[process.env.NODE_ENV || 'development'];
const initModels = require('./init-models');
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = initModels(sequelize);
Object.assign(db, models);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

const Sequelize = require("sequelize");
require('dotenv').config();
const dbConfig = require('../../config/DB.config.js');

const sequelize = new Sequelize(dbConfig["DB_" + process.env.ENVIRONMENT], dbConfig["USER_" + process.env.ENVIRONMENT], dbConfig["PASSWORD_" + process.env.ENVIRONMENT], {
    host: dbConfig["HOST_" + process.env.ENVIRONMENT],
    dialect: dbConfig.dialect,
    port: 3306,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

module.exports = sequelize;
const Sequelize = require('sequelize');

exports.sequelize = Sequelize;
exports.op = Sequelize.Op;

exports.connection = new Sequelize(
    process.env.PROJECT_DATABASE, 
    process.env.PROJECT_USER, 
    process.env.PROJECT_PASSWORD, {
        host: process.env.PROJECT_HOST,
        dialect: process.env.PROJECT_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);
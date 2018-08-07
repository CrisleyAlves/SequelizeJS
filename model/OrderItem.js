'use strict';

const sequelize = require("../sequelize/config").sequelize;
const connection = require("../sequelize/config").connection;

const OrderItem = connection.define("OrderItem", {
        observation: {
            type: sequelize.STRING
        }
    }, {} 
);

module.exports = OrderItem;
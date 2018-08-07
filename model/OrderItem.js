'use strict';

const sequelize = require("../sequelize/config").sequelize;
const connection = require("../sequelize/config").connection;
const Product = require("../model/Product");

const OrderItem = connection.define("OrderItem", {
        observation: {
            type: sequelize.STRING
        }
    }, {} 
);

OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product'});

module.exports = OrderItem;
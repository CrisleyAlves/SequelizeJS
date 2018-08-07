'use strict';
const sequelize = require("../sequelize/config").sequelize;
const connection = require("../sequelize/config").connection;

const OrderItem = require("./OrderItem");
const clientModel = require("./Client");
const companyModel = require("./Company");
const Payment = require("./Payment");

const Order = connection.define("Order", {
        formaPagamento: {
            type: sequelize.STRING,
            allowNull: false
        },
        valorTotal: {
            type: sequelize.DECIMAL,
            validate: {
                isDecimal: {
                    args: true,
                    msg: "O valor total aceita apenas decimais"
                }
            }
        },
        statusPedido: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: "O status aceita apenas números"
                }
            }
        },
        avaliado: {
            type: sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    Order.belongsTo( clientModel, { as: "client" });
    Order.belongsTo( companyModel, { as: "company" });    
    Order.hasOne(Payment);
    Order.hasMany(OrderItem, { as: 'itens'});

    module.exports = Order;



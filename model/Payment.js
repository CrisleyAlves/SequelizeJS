'use strict';
const sequelize = require("../sequelize/config").sequelize;
const connection = require("../sequelize/config").connection;

const Payment = connection.define("Payment", {
        paymentToken: {
            type: sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [50, 50],
                    msg: "O token de pagamento deve ter 50 caracteres"
                }
            }
        }
    }, {} );

module.exports = Payment;
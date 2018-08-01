'use strict';
const Order = require("./Order");

module.exports = (connection, sequelize) => {

    var Payment = connection.define("Payment", {
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

    //Deu trabalho
    Payment.belongsTo(Order(connection, sequelize));
    
    return Payment;
}
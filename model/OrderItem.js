'use strict';
const Order = require("./Order");

module.exports = (connection, sequelize) => {

    var OrderItem = connection.define("OrderItem", {
        observation: {
            type: sequelize.STRING
        },
        orderId: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate:{
                isInt: {
                    args: true,
                    msg: "O ID do pedido deve ser informado"
                }
            }
        },
        productId: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate:{
                isInt: {
                    args: true,
                    msg: "O ID do produto deve ser informado"
                }
            }
        }
    }, {} );
    
    return OrderItem;
}
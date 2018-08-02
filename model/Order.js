'use strict';
const OrderItem = require("./OrderItem");

module.exports = (connection, sequelize) => {
    var Order = connection.define("Order", {
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
        },
        clientId: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate:{
                isInt: {
                    args: true,
                    msg: "O ID do cliente deve ser informado"
                }
            }
        },
        companyId: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate:{
                isInt: {
                    args: true,
                    msg: "A empresa responsável pelo produto deve ser informada"
                }
            }
        }
    }, {} );

    //Deu trabalho
    Order.hasMany( OrderItem(connection, sequelize), {
        as: "itens",
        foreignKey: 'orderId',
        allowNull: false
    });
    
    return Order;
}
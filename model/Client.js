'use strict';
const Order = require("./Order");

module.exports = (connection, sequelize) => {
    var Client = connection.define("Client", {
        name: {
            type: sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "O nome deve ter pelo menos 1 caractere e menos do que 20"
                }
            }
        },
        email: {
            type: sequelize.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Informe um e-mail válido"
                }
            }
        },
        photo: {
            type: sequelize.STRING
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {} );

    //Deu trabalho
    Client.hasMany( Order(connection, sequelize), {
        as: "orders",
        foreignKey: 'clientId',
        allowNull: false
    });
    
    return Client;
}
'use strict';

const sequelize = require("../sequelize/config").sequelize;
const connection = require("../sequelize/config").connection;

const Client = connection.define("Client", {
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

module.exports = Client;
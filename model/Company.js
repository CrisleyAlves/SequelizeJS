'use strict';
const Product = require("./Product");

module.exports = (connection, sequelize) => {

    var Company = connection.define("Company", {
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
        razaoSocial: {
            type: sequelize.STRING
        },
        fantasyName: {
            type: sequelize.STRING
        },
        logo: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {} );

    //Deu trabalho
    Company.hasMany( Product(connection, sequelize), {
        as: "produtos",
        foreignKey: 'companyId',
        allowNull: false
    });
    
    return Company;
}
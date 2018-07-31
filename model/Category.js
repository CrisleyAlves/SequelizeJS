'use strict';
const Product = require("./Product");

module.exports = (connection, sequelize) => {

    var Category = connection.define("Category", {
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
        description: {
            type: sequelize.TEXT,
            allowNull: true,
            defaultValue: 'Em breve'
        }
    }, {} );

    //Deu trabalho
    Category.hasMany( Product(connection, sequelize), {
        as: "produtos",
        foreignKey: 'categoryId',
        allowNull: false
    });
    
    return Category;
}
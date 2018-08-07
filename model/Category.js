'use strict';
const Product = require("./Product");
const sequelize = require("../sequelize/config").sequelize;
const connection = require("../sequelize/config").connection;

const Category = connection.define("Category", {
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
    Category.hasMany( Product, {
        as: "products",
        foreignKey: 'categoryId',
        allowNull: false
    });

    module.exports = Category;
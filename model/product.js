'use strict';

module.exports = (connection, sequelize) => {
    var Product = connection.define("Products", {    
        name: {
            type: sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 50],
                    msg: "O nome deve ter pelo menos 10 caracteres e menos do que 50"
                }
            }
        },
        description: {
            type: sequelize.TEXT,
            allowNull: true,
            defaultValue: 'Em breve'
        },
        price: {
            type: sequelize.DECIMAL,
            defaultValue: 0,
            allowNull: false
        },
        author: {
            type: sequelize.STRING,
            allowNull: false,
            validate: {
                customValidator: (value)=>{
                    if(value.length < 10){
                        throw new Error('O autor não pode ter menos que 10 caracteres')
                    }
                }
            }
        },
        categoryId: {
            type: sequelize.INTEGER
        }
    }, {} );
        
    return Product;
}
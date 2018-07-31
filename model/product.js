const seqConfig = require("../sequelize/config");
const connection = seqConfig.connection;
const Sequelize = seqConfig.sequelize;

const Product = connection.define("Products", {
    
    //Chave primária é gerada automaticamente caso nenhum atributo possua primaryKey: true
    idManual:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 50],
                msg: "O nome deve ter pelo menos 10 caracteres e menos do que 50"
            }
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Em breve'
    },
    price: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            customValidator: (value)=>{
                if(value.length < 10){
                    throw new Error('O autor não pode ter menos que 10 caracteres')
                }
            }
        }
    }
}, {
    freezeTableName: false
});

connection.sync({
    // logging: console.log
    force: true // vai apagar a tabela se ela existir no banco - não utilizar em PROD
}).then(()=>{
    Product.create({
        name: "NodeJS + Express + Sequelize + React",
        description: "Development of a project using JS",
        price: 19.90,
        author: "Crisley Alves"
    }).then( (result) => {
        Product.findAll().then( (result)=>{
            console.log(result.length);
        });
    }).catch( error =>{
        console.log(error);
    });
}).catch(error => {
    console.log(error);
})
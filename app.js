const express = require("express");
const app = express();
const morgan = require("morgan");

const seqConfig = require("./sequelize/config");
const connection = seqConfig.connection;
const sequelize = seqConfig.sequelize;

//models
const Product = require("./model/product")(connection, sequelize);
const Category = require("./model/category")(connection, sequelize);

connection.sync({
    // force: true
    logging: false
}).then( result =>{
    // Category.create({
    //     name: "Javascript",
    //     description: "Studying Javascript"
    // }).then( (result) => {});   

    // Product.create({
    //         name: "NodeJS + Express + Sequelize + React",
    //         description: "Development of a project using JS",
    //         price: 19.90,
    //         author: "Crisley Alves",
    //         categoryId: 3
    //     }).then( (result) => {
            
    //     }).catch( error =>{
    //         console.log(error);
    //     });

    Category.findAll({
        
        //tipo um JOIN, defini um alias em Category, o "as" tem que ter o mesmo nome, senão quebra
        include: [
            {model: Product, as: "produtos"}
        ],
    }).then((result)=>{
        console.log(result[1].dataValues.produtos);
    })

}).catch(error => {
    console.log("Erro ao conectar");
    console.log(error);
});

    // category(connection, sequelize).create({
    //     name: "Javascript",
    //     "description": "Studying Javascript"
    // }).then((result)=>{
    //     console.log("Categoria cadastrada com sucesso");
    // }).catch((error)=>{
    //     console.log(error);
    // });

    // product(connection, sequelize).create({
    //         name: "NodeJS + Express + Sequelize + React",
    //         description: "Development of a project using JS",
    //         price: 19.90,
    //         author: "Crisley Alves",
    //         CategoryId: 1
    //     }).then( (result) => {
            
    //     }).catch( error =>{
    //         console.log(error);
    // });

// log da requisição no console
app.use(morgan("dev"));

//Configuração do CORS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

module.exports = app;
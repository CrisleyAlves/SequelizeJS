const express = require("express");
const app = express();
const morgan = require("morgan");

//models
const productModel = require("./model/product");

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
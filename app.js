const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const categorytRoutes = require("./api/routes/Category");
const companyRoutes = require("./api/routes/Company");
const clientRoutes = require("./api/routes/Client");
const productRoutes = require("./api/routes/Product");
const orderRoutes = require("./api/routes/Order");

// log da requisição no console
app.use(morgan("dev"));
app.use('/uploads', express.static("uploads")) // quando a rota for X, permita acesso a pasta de uploads
app.use('/uploads/clients', express.static("uploads")) // quando a rota for X, permita acesso a pasta de uploads
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/categories', categorytRoutes);
app.use('/companies', companyRoutes);
app.use('/clients', clientRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{ 
    res.status(error.status || 400);
    res.json({
        error: {
            message: error.message
        }
    })
});

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
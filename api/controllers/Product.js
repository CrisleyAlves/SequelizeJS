const seqConfig = require("../../sequelize/config");
const connection = seqConfig.connection;
const sequelize = seqConfig.sequelize;
const Op = sequelize.Op;

const Product = require("../../model/Product");

exports.getAll = (req, res, next)=>{
    connection.sync().then(()=>{
        Product.findAll().then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                products: result.map( (product) => {
                    return{
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price
                    }
                })
            });
        })
        .catch((error)=>{
            res.status(500).json({
                message: "Ocorreu um erro durante a solicitação",
                error: error
            })
        })
    })
    .catch((error)=>{
        res.status(500).json({
            message: "Ocorreu um erro ao conectar com o banco",
            error: error
        });
    });    
};

exports.getById = (req, res, next)=>{
    connection.sync().then(()=>{
        Product.findById(req.params.productId).then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                product: {
                        id: result.id,
                        name: result.name,
                        description: result.description,
                        description: result.price
                    }
                })
            }).catch((error)=>{
                res.status(500).json({
                    message: "Produto não encontrado",
                    error: error
                })
            });
        })
    .catch((error)=>{
        res.status(500).json({
            message: "Ocorreu um erro ao conectar com o banco",
            error: error
        });
    });    
};

exports.insert = (req, res, next)=>{
    connection.sync().then(()=>{
        Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            author: req.body.author,
            companyId: req.body.companyId,
            categoryId: req.body.categoryId
        })
        .then( (result) =>{
            res.status(201).json({
                message: "Produto cadastrado com sucesso",
                product: {
                        id: result.id,
                        name: result.name,
                        description: result.description,
                        price: result.price
                    }
                });
            })
            .catch( (error) =>{
                res.status(500).json({
                    message: "Ocorreu um erro ao cadastrar o produto",
                    error: error
                });
            });
        })
    .catch((error)=>{
        res.status(500).json({
            message: "Ocorreu um erro ao conectar com o banco",
            error: error
        });
    });    
};

exports.update = (req, res, next)=>{
    connection.sync().then(()=>{
        Product.update({
            name: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            author: req.body.author,
            companyId: req.body.companyId,
            categoryId: req.body.categoryId
        }, {
            where: {
                id: req.body.id
            }
        }).then( (result) =>{
            res.status(200).json({
                message: "Produto atualizado com sucesso"
            })
        }).catch( (error) =>{
            res.status(500).json({
                message: "Ocorreu um erro ao atualizar o produto",
                error: error
            });
        });
    })
    .catch((error)=>{
        res.status(500).json({
            message: "Ocorreu um erro ao conectar com o banco",
            error: error
        });
    });    
};

exports.delete = (req, res, next)=>{
    connection.sync().then(()=>{
        Product.destroy({
            where: {
                id: req.params.productId
            }
        }).then( (result) =>{
            console.log(result);
            if(result === 1){
                res.status(200).json({
                    message: "Produto removido com sucesso"
                })
            }else{
                res.status(404).json({
                    message: "O produto informado não existe"
                });
            }
        });
    })
    .catch((error)=>{
        res.status(500).json({
            message: "Ocorreu um erro ao conectar com o banco",
            error: error
        });
    });    
};
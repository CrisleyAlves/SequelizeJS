const seqConfig = require("../../sequelize/config");
const connection = seqConfig.connection;
const sequelize = seqConfig.sequelize;
const Op = sequelize.Op;

const Category = require("../../model/Category")(connection, sequelize);

exports.getAll = (req, res, next)=>{
    connection.sync().then(()=>{
        Category.findAll().then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                categories: result.map( (category) => {
                    return{
                        id: category.id,
                        name: category.name,
                        description: category.description
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
        Category.findById(req.params.categoriaId).then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                category: {
                        id: result.id,
                        name: result.name,
                        description: result.description
                    }
                })
            }).catch((error)=>{
                res.status(500).json({
                    message: "Categoria não encontrada",
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
        Category.create({
            name: req.body.name,
            description: req.body.description
        })
        .then( (result) =>{
            res.status(201).json({
                message: "Categoria cadastrada com sucesso",
                category: {
                        id: result.id,
                        name: result.name,
                        description: result.description
                    }
                });
            })
            .catch( (error) =>{
                res.status(500).json({
                    message: "Ocorreu um erro ao cadastrar a categoria",
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
        Category.update({
            name: req.body.name,
            description: req.body.description
        }, {
            where: {
                id: req.body.id
            }
        }).then( (result) =>{
            res.status(200).json({
                message: "Categoria atualizada com sucesso"
            })
        }).catch( (error) =>{
            res.status(500).json({
                message: "Ocorreu um erro ao atualizar a categoria",
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
        Category.destroy({
            where: {
                id: req.params.categoriaId
            }
        }).then( (result) =>{
            console.log(result);
            if(result === 1){
                res.status(200).json({
                    message: "Categoria removida com sucesso"
                })
            }else{
                res.status(404).json({
                    message: "A categoria informada não existe"
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
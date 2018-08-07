const seqConfig = require("../../sequelize/config");
const connection = seqConfig.connection;
const sequelize = seqConfig.sequelize;
const Op = sequelize.Op;
const Bcrypt = require("bcrypt");

const Client = require("../../model/Client");

exports.getAll = (req, res, next)=>{
    connection.sync().then(()=>{
        Client.findAll().then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                clients: result.map( (client) => {
                    return{
                        id: client.id,
                        name: client.name,
                        email: client.email,
                        photo: client.photo
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
        Client.findById(req.params.clientId).then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                client: {
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        photo: result.photo
                    }
                })
            }).catch((error)=>{
                res.status(500).json({
                    message: "Cliente não encontrado",
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
    Bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err){
            res.status(500).json({
                message: 'Ocorreu um erro ao criptografar a senha',
                error: err
            });
        }else{
            connection.sync().then(()=>{
                Client.create({
                    name: req.body.name,
                    email: req.body.email,
                    photo: req.file.path,
                    password: hash,
                })
                .then( (result) =>{
                    res.status(201).json({
                        message: "Cliente cadastrado com sucesso",
                        category: {
                                id: result.id,
                                name: result.name,
                                email: result.email
                            }
                        });
                    })
                    .catch( (error) =>{
                        res.status(500).json({
                            message: "Ocorreu um erro ao cadastrar o cliente",
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
        }
    });
};

exports.update = (req, res, next)=>{
    connection.sync().then(()=>{
        Client.update({
            name: req.body.name,
            email: req.body.email,
            photo: req.file.path
        }, {
            where: {
                id: req.body.id
            }
        }).then( (result) =>{
            res.status(200).json({
                message: "Cliente atualizado com sucesso"
            })
        }).catch( (error) =>{
            res.status(500).json({
                message: "Ocorreu um erro ao atualizar o cliente",
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
        Client.destroy({
            where: {
                id: req.params.clientId
            }
        }).then( (result) =>{
            console.log(result);
            if(result === 1){
                res.status(200).json({
                    message: "Cliente removido com sucesso"
                })
            }else{
                res.status(404).json({
                    message: "O cliente informado não existe"
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
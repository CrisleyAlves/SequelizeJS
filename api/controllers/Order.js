const seqConfig = require("../../sequelize/config");
const connection = seqConfig.connection;
const sequelize = seqConfig.sequelize;
const Op = sequelize.Op;

const Order = require("../../model/Order");
const OrderItem = require("../../model/OrderItem");

exports.getAll = (req, res, next)=>{
    connection.sync().then(()=>{
        Order.findAll({
            include: [{
                model: OrderItem,
                as: "itens"
            }]
        }).then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                orders: result.map( (order) => {
                    return{
                        id: order.id,
                        statusPedido: order.statusPedido,
                        clientId: order.clientId,
                        companyId: order.companyId,
                        avaliado: result.avaliado
                    }
                }),
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
        Order.findById(req.params.orderId).then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                order: {
                        id: result.id,
                        statusPedido: result.statusPedido,
                        clientId: result.clientId,
                        companyId: result.companyId,
                        avaliado: result.avaliado
                    }
                })
            }).catch((error)=>{
                res.status(500).json({
                    message: "Pedido não encontrado",
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
        Order.create({
            formaPagamento: req.body.formaPagamento,
            valorTotal: req.body.valorTotal,
            statusPedido: req.body.statusPedido,
            avaliado: req.body.avaliado,
            clientId: req.body.clientId,
            companyId: req.body.companyId
        })
        .then( (result) =>{
            res.status(201).json({
                message: "Pedido solicitado com sucesso",
                product: {
                        id: result.id,
                        statusPedido: result.statusPedido,
                        clientId: result.clientId,
                        companyId: result.companyId
                    }
                });
            })
            .catch( (error) =>{
                res.status(500).json({
                    message: "Ocorreu um erro ao realizar o pedido",
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
        Order.update({
            id: req.body.id,
            statusPedido: req.body.statusPedido,
            avaliado: req.body.avaliado
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
        Order.destroy({
            where: {
                id: req.params.orderId
            }
        }).then( (result) =>{
            console.log(result);
            if(result === 1){
                res.status(200).json({
                    message: "Pedido removido com sucesso"
                })
            }else{
                res.status(404).json({
                    message: "O pedido informado não existe"
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
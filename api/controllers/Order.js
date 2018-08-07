const seqConfig = require("../../sequelize/config");
const connection = seqConfig.connection;
const sequelize = seqConfig.sequelize;
const Op = sequelize.Op;

const Order = require("../../model/Order");
const OrderItem = require("../../model/OrderItem");
const Payment = require("../../model/Payment");
const Client = require("../../model/Client");
const Company = require("../../model/Company");

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
        Order.findOne(
            {
                where: {
                  id: req.params.orderId
                },
                include: [
                        { model: OrderItem, as: 'itens'}, //referencia ao alias do model Order.js
                        { model: Client, as: 'client'},
                        { model: Company, as: 'company'}
                ]
            }
        ).then( (result) =>{
            console.log(result)
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                order: {
                        id: result.id,
                        statusPedido: result.statusPedido,
                        client: {
                            "id": result.client.id,
                            "name": result.client.name,
                            "email": result.client.email,
                            "photo": result.client.photo
                        },
                        company: {
                            "razaoSocial": result.company.razaoSocial,
                            "logo": result.company.logo
                        },
                        avaliado: result.avaliado,
                        itens: result.itens.map((item)=>{
                            return{
                                id: item.id,
                                observation: item.observation
                            }
                        })
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
            companyId: req.body.companyId,
            itens: req.body.itens,
            payment: req.body.payment
        }, {
            include: [
                {
                    model: OrderItem,
                    as: 'itens' //referencia ao alias do model Order.js
                },
                {
                    model: Payment,
                    as: "payment" //referencia ao alias do model Order.js
                }
            ]
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
                console.log(error);
                res.status(500).json({
                    message: "Ocorreu um erro ao realizar o pedido",
                    error: error
                });
            });
        })
    .catch((error)=>{
        console.log(error);
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
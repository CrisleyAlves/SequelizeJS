const seqConfig = require("../../sequelize/config");
const connection = seqConfig.connection;
const sequelize = seqConfig.sequelize;
const Op = sequelize.Op;

const Company = require("../../model/Company");

exports.getAll = (req, res, next)=>{
    connection.sync().then(()=>{
        Company.findAll().then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                companies: result.map( (company) => {
                    return{
                        id: company.id,
                        name: company.name,
                        razaoSocial: company.razaoSocial,
                        fantasyName: company.fantasyName,
                        logo: company.logo
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
        Company.findById(req.params.companyId).then( (result) =>{
            res.status(200).json({
                message: "Requisição realizada com sucesso",
                company: {
                        id: result.id,
                        name: result.name,
                        razaoSocial: result.razaoSocial,
                        fantasyName: result.fantasyName,
                        logo: result.logo
                    }
                })
            }).catch((error)=>{
                res.status(500).json({
                    message: "Empresa não encontrada",
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
        Company.create({
            name: req.body.name,
            razaoSocial: req.body.razaoSocial,
            fantasyName: req.body.fantasyName,
            logo: req.file.path
        })
        .then( (result) =>{
            res.status(201).json({
                message: "Empresa cadastrada com sucesso",
                company: {
                        id: result.id,
                        name: result.name,
                        description: result.description
                    }
                });
            })
            .catch( (error) =>{
                res.status(500).json({
                    message: "Ocorreu um erro ao cadastrar a empresa",
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
        Company.update({
            name: req.body.name,
            razaoSocial: req.body.razaoSocial,
            fantasyName: req.body.fantasyName,
            logo: req.file.path
        }, {
            where: {
                id: req.body.id
            }
        }).then( (result) =>{
            res.status(200).json({
                message: "Empresa atualizada com sucesso"
            })
        }).catch( (error) =>{
            res.status(500).json({
                message: "Ocorreu um erro ao atualizar a empresa",
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
        Company.destroy({
            where: {
                id: req.params.companyId
            }
        }).then( (result) =>{
            console.log(result);
            if(result === 1){
                res.status(200).json({
                    message: "Empresa removida com sucesso"
                })
            }else{
                res.status(404).json({
                    message: "A empresa informada não existe"
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
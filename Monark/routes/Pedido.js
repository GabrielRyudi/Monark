var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Pedido = require('../model/PedidoModel');
var Roupa = require('../model/RoupaModel');
var Caixa = require('../model/CaixaModel');
var auth = require('../config/auth');

router.post('/', auth, (req, res, next) => {
    var {nome, roupa, idRoupa, codigoAluguel, dataAluguel, dataDevolucao, valor, situacao, mudancas} = req.body;
    let newPed = new Pedido({nome, roupa, idRoupa, codigoAluguel, dataAluguel, dataDevolucao, valor, situacao, mudancas});
    Roupa.findOne({codigoR:idRoupa})
        .then(r => {
            if(!r){
                res.json({msg:'A roupa não existe!'})
            }else{
                if(r.disponivel == 'Dísponivel'){
                    const situacao = 'Indisponivel';
                    Roupa.updateOne({codigoR:idRoupa},{disponivel:situacao})
                        .then(ro => {
                            newPed.save()
                                .then(data => {
                                    if(!data){
                                        res.json({msg: 'Erro'});
                                    }else{
                                        let tipo = 'Entrada';
                                        let transacao = 'Aluguel de roupa';
                                        let entidade = nome;
                                        let data = dataAluguel;
                                        let newCaixa = new Caixa({
                                            tipo,
                                            valor,
                                            transacao,
                                            entidade,
                                            data,
                                        })
                                        newCaixa.save()
                                            .then(c => {
                                                res.json({msg: 'Pedido registrado com sucesso!'});
                                            })
                                            .catch(next)
                                    }
                                })
                                .catch(next);
                        })
                        .catch(next)
                }else{
                    res.json({msg:'A roupa não está disponivel'})
                    console.log(r);
                }  
            }
        })
        .catch(next)
});

router.get('/', auth, (req, res, next) => {
    Pedido.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

router.put('/', auth, (req, res, next) => {
    var {nome, roupa, idRoupa, codigoAluguel, dataAluguel, dataDevolucao, valor, situacao, mudancas, id} = req.body;
    Pedido.updateOne({_id:id},{nome:nome, roupa:roupa, idRoupa:idRoupa, codigoAluguel:codigoAluguel, 
    dataAluguel:dataAluguel, dataDevolucao:dataDevolucao, valor:valor, situacao:situacao, mudancas:mudancas})
        .then(data => {
            res.json({msg: 'Pedido editado com sucesso!'});
        })
        .catch(next);
});

router.put('/fecha', auth, (req, res, next) => {
    var {situacao, id} = req.body;
    Pedido.updateOne({_id:id},{situacao:situacao})
        .then(data => {
            if(!data){
                res.json({msg:'Problemas ao fechar o pedido!'});
            }else{
                if(situacao == 'Finalizado'){
                    Pedido.findOne({_id:id})
                        .then(p => {
                            const codigo = p.idRoupa;
                            const situacao = 'Disponivel';
                            Roupa.updateOne({codigoR:codigo},{disponivel:situacao})
                                .then(r => {
                                    res.json({msg: 'Pedido finalizado!'})
                                })
                        })
                        .catch(next)
                }else if(situacao == 'Sem devolução'){
                    Pedido.findOne({_id:id})
                        .then(p => {
                            const codigo = p.idRoupa;
                            const situacao = 'Indisponivel';
                            Roupa.updateOne({codigoR:codigo},{disponivel:situacao})
                                .then(r => {
                                    res.json({msg: 'Pedido a roupa não foi devolvida!'})
                                })
                        })
                        .catch(next)
                }
            }
        })
        .catch(next);
});

router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Pedido.deleteOne({_id:id})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

module.exports = router;
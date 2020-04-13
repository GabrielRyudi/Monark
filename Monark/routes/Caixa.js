var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Caixa = require('../model/CaixaModel');
var auth = require('../config/auth');

//Adicionar Caixa
router.post('/', auth, (req, res, next) => {
    var {tipo, valor, transacao, forma, entidade, data} = req.body;
    let newCaixa = new Caixa({tipo, valor, transacao, forma, entidade, data});
    newCaixa.save()
        .then(data => {
            res.json({msg:'Transação cadastrada com sucesso!'});
        })
        .catch(next);
});

//Listar Clientes
router.get('/', auth, (req, res, next) => {
    Caixa.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Editar cliente
router.put('/', auth, (req, res, next) => {
    var {tipo, valor, transacao, forma, entidade, data, id} = req.body;
    Caixa.updateOne({_id:id},{tipo:tipo, valor:valor, transacao:transacao, forma:forma, entidade:entidade, data:data})
        .then(data => {
            res.json({msg: 'Transação editada com sucesso!'});
        })
        .catch(next);
});

//Deletar cliente
router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Caixa.deleteOne({_id:id})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

module.exports = router;
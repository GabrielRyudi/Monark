var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Roupa = require('../model/RoupaModel');
var auth = require('../config/auth');

//Adicionar roupa
router.post('/', auth, (req, res, next) => {
    var {codigoR, grade, tecido, tipo, cor, preco, obs, disponivel} = req.body;
    let newRou = new Roupa({codigoR, grade, tecido, tipo, cor, preco, obs, disponivel});
    newRou.save()
        .then(data => {
            res.json({msg:'Roupa cadastrada com sucesso!'});
        })
        .catch(next);
});

//Listar Roupa
router.get('/', auth, (req, res, next) => {
    Roupa.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Editar cliente
router.put('/', auth, (req, res, next) => {
    var {codigoR, grade, tecido, tipo, cor, preco, obs, disponivel,id} = req.body;
    Roupa.updateOne({_id:id},{codigoR:codigoR, grade:grade, tecido:tecido, tipo:tipo, 
    cor:cor, preco:preco, obs:obs, disponivel:disponivel})
        .then(data => {
            res.json({msg: 'Roupa editada com sucesso!'});
        })
        .catch(next);
});

//Deletar cliente
router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Roupa.deleteOne({_id:id})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

module.exports = router;
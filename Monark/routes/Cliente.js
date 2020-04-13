var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Cliente = require('../model/ClienteModel');
var auth = require('../config/auth');

router.post('/', auth, (req, res, next) => {
    var {nome, celular, rua, bairro, cidade, numero, datanasc, obs} = req.body;
    let newCli = new Cliente({
        nome,
        celular,
        rua,
        bairro,
        cidade,
        numero,
        datanasc,
        obs
    });
    newCli.save()
        .then(data => {
            res.json({msg:'Cliente cadastrado com sucesso!', logado: req.user});
        })
        .catch(next);
});

router.get('/', auth, (req, res, next) => {
    Cliente.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

router.put('/', auth, (req, res, next) => {
    let {nome, celular, rua, bairro, cidade, numero, datanasc, obs, id} = req.body;
    Cliente.updateOne({_id:id},{nome: nome, celular:celular, rua:rua, bairro:bairro, cidade:cidade, numero:numero, 
    datanasc:datanasc, obs:obs})
        .then(data => {
            res.json({msg: 'Cliente editado com sucesso!'});
        })
        .catch(next);
});

router.delete('/:id', auth, (req, res, next) => {
    var id = req.params.id;
    Cliente.deleteOne({_id:id})
        .then(data => {
            res.status(200).json({msg: 'Cliente excluido com sucesso!'});
        })
        .catch(next);
});

module.exports = router;
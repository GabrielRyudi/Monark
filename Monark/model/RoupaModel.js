var mongoose = require('mongoose');

var RoupaSchema = mongoose.Schema({
    codigoR: String,
    grade: String,
    tecido: String,
    tipo: String,
    cor: String,
    preco: Number,
    obs: String,
    disponivel: String
});

var Roupa = mongoose.model('Roupa', RoupaSchema);

module.exports = Roupa;

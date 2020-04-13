    
var mongoose = require('mongoose');

var CaixaSchema = mongoose.Schema({
    tipo: String,
    valor: Number,
    transacao: String,
    forma: String,
    entidade: String,
    data: Date,
});

var Caixa = mongoose.model('Caixa', CaixaSchema);

module.exports = Caixa;

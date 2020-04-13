    
var mongoose = require('mongoose');

var PedidoSchema = mongoose.Schema({
    nome: String,
    roupa: String,
    idRoupa: String,
    codigoAluguel: String,
    dataAluguel: Date,
    dataDevolucao: Date,
    valor: Number,
    situacao: String,
    mudancas: String
});

var Pedido = mongoose.model('Pedido', PedidoSchema);

module.exports = Pedido;

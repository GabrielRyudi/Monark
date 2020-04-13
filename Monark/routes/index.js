var express = require('express');
var router = express.Router();

router.use('/cliente', require('./Cliente'));
router.use('/roupa', require('./Roupa'));
router.use('/caixa', require('./Caixa'));
router.use('/usuario', require('./User'));
router.use('/pedido', require('./Pedido'));

module.exports = router;
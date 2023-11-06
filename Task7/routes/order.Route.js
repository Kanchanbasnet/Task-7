const express = require('express');
const router = express.Router();
const {checkout, getAllOrders, getOneOrder}= require('../modules/Order/order.Controller')

router.post('/checkout', checkout);
router.get('/',getAllOrders);
router.get('/getOne', getOneOrder);

module.exports = router
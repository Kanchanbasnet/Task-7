const express = require('express');
const router = express.Router();
const {checkout, getAllOrders, getOneOrder, getTopSellingProducts, getMonthlySales}= require('../modules/Order/order.Controller')

router.post('/checkout', checkout);
router.get('/',getAllOrders);
router.get('/getOne', getOneOrder);
router.get('/topSellingProducts', getTopSellingProducts);


module.exports = router
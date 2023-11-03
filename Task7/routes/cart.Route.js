const express = require('express');
const router = express.Router();
const {addToCart, getAllCart, getCartById}= require('../modules/Cart/cart.Controller')

router.post('/addToCart', addToCart);
router.get('/',getAllCart);
router.get('/:id',getCartById);


module.exports = router
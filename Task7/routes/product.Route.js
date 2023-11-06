const express = require('express');
const {getProducts,getProductById, outOfStock,createProduct, updateQuantity, updateProduct, deleteProduct, searchProducts, topTenProducts  } = require('../modules/Product/product.Controller');

const router = express.Router()
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/productImages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    },
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('product_image'), createProduct);
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/topProducts', topTenProducts);

router.get('/outOfStock',outOfStock);
router.get('/:id',getProductById);
router.patch('/updateQuantity/:id',updateQuantity);
router.put('/update/:id', upload.single('product_image'), updateProduct);
router.delete('/delete/:id', deleteProduct);


module.exports = router
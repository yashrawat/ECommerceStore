const express = require('express');

const productControllers = require('../controllers/product-controllers');

const router = express.Router();

router.get('/allProducts', productControllers.getAllProducts);

router.get('/productById/:id', productControllers.getProductById);

// router.post('/addProductToCart/:id', productControllers.addProductToCart);

router.delete('/deleteProduct/:id', productControllers.deleteProductById);

module.exports = router;
const Product = require('../models/product-models');

// Route Working, tested with postman
exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(fetchedProducts => {
            if (fetchedProducts) {
                res.status(200).json({
                    message: 'All Products fetched successfully',
                    products: fetchedProducts
                });
            } else {
                res.status(404).json({
                    message: 'Error! Products not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: `Fetching products failed => ${error}`
            });
        });
};

// Route Working, tested with postman
exports.getProductById = (req, res, next) => {
    Product.findById({ _id: req.params.id })
        .then(fetchedProduct => {
            if (fetchedProduct) {
                res.status(200).json({
                    message: 'Product fetched successfully by ID',
                    products: fetchedProduct
                });
            } else {
                res.status(404).json({
                    message: 'Error! Product not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: `Fetching product by ID failed => ${error}`
            });
        });
};

// ---------
// Option 1
// ---------
// exports.addProduct = (req, res, next) => {};
// exports.deleteProduct = (req, res, next) => {};

// ---------
// Option 2
// ---------
// exports.addProductToCartById = (req, res, next) => {};
// exports.deleteProductFromCartById = (req, res, next) => {};

// exports.addProductToWishlistById = (req, res, next) => {};
// exports.deleteProductFromWishlistById = (req, res, next) => {};
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

// exports.addProduct = (req, res, next) => {};

exports.deleteProductById = (req, res, next) => {
    Product.findByIdAndRemove({ _id: req.params.id }, (error, loadedProduct) => {
        if (error) {
            res.status(500).json({
                message: `Product could not be deleted from PRODUCT Catalog => ${error}`
            });
        } else {
            res.status(200).json({
                message: `Product deleted from PRODUCT Catalog successfully => ${loadedProduct}`
            });
        }
    });
};

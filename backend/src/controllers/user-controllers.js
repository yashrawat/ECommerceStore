const User = require('../models/user-model');

// TODO: FIX ME, Route not working, tested with POSTMAN
exports.addUserData = (req, res, next) => {
    const user = new User({
        authId: req.body.authId,
        cart: req.body.cart,
        wishlist: req.body.wishlist,
        order: req.body.order
    });

    user.save()
        .then(cartItem => {
            res.status(201).json({
                message: `Item successfully added to CART`,
                userData: cartItem
            });
        })
        .catch(error => {
            res.status(500).json({
                message: `Could not add item to CART => ${error}`
            });
        });
};

// Route Working, tested with postman
exports.getUserData = (req, res, next) => {
    User.find()
        .then(fetchedItems => {
            if (fetchedItems) {
                res.status(200).json({
                    message: `All items fetched successfully from CART`,
                    userData: fetchedItems
                });
            } else {
                res.status(404).json({
                    message: `Error! Items not found in CART`
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: `Items fetching from CART failed => ${error}`
            });
        });
};

// TODO: FIXED, but test with POSTMAN after fixing addItemToCartById
exports.deleteUserDataById = (req, res, next) => {
    User.findByIdAndRemove({ _id: req.params.id }, (error, loadedItem) => {
        if (error) {
            res.status(500).json({
                message: `Item could not be deleted from CART => ${error}`
            });
        } else {
            res.status(200).json({
                message: `Item deleted from CART successfully => ${loadedItem}`
            });
        }
    });
};

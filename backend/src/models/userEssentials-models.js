const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userEssentialsSchema = mongoose.Schema({
    authUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
        unique: true
    },
    // same productId can exist in cart, wishlist & orderHistory,
    // Problem solved: same product cannot be in cart, wishlist & orderhistory at same time
    cart: [
        {
            // productId should be unique in cart
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                // unique: true
            }
        }
    ],
    wishlist: [
        {
            // productId should be unique in wishlist
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                // unique: true
            },
            quantity: {
                type: Number
            }
        }
    ],
    orderHistory: [
        {
            // productId should be unique in orderHistory
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                // unique: true
            },
            orderDate: {
                type: Date
            },
            paymentMethod: {
                type: String
            },
            deliveryAddress: {
                type: String
            }
        }
    ]
});

userEssentialsSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserEssentials', userEssentialsSchema);
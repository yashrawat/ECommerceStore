const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    cart: {
        itemsList: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    wishlist: {
        productsList: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                }
            }
        ]
    },
    order: {
        ordersList: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                orderDate: {
                    type: Date,
                    required: true
                },
                deliveryAddress: {
                    type: String,
                    required: true
                },
                paymentMethod: {
                    type: String,
                    required: true
                }
            }
        ]
    }
});

module.exports = mongoose.model('User', userSchema);
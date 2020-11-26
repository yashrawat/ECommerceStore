const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
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
    }
    // ,
    // wislist: {
    //     productId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Product',
    //         required: true
    //     }
    // },
    // order: {
    //     orderDate: {
    //         type: Number,
    //         required: true
    //     },
    //     deliveryAddress: {
    //         type: String,
    //         required: true
    //     },
    //     paymentMethod: {
    //         type: String,
    //         required: true
    //     }
    // }
});

module.exports = mongoose.model('User', userSchema);
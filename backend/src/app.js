const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth-routes');
const productRoutes = require('./routes/product-routes');
const userEssentialsRoutes = require('./routes/userEssentials-routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connecting to mongoDB, ECommerceStore = database name AND listening to PORT 3000
// mongoose.connect('mongodb://localhost:27017/ECommerceStore', { useNewUrlParser: true, useUnifiedTopology: true })
// mongodb atlas
mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@ecommercestore.l0v5w.mongodb.net/ECommerceStore?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT);
        console.log('Connected to database');
    })
    .catch(err => {
        console.log('Connection failed ' + err);
    });

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// statically loading images
app.use('/images', express.static(path.join('images')));

// CORS implementation
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/userEssentials', userEssentialsRoutes);

// module.exports = app;

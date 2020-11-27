const express = require('express');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

// add item to CART by ID
router.post('/addUserData', userControllers.addUserData);

// get all items from CART
router.get('/getUserData', userControllers.getUserData);

// delete one item from CART by ID
router.delete('/deleteUserDataById/:id', userControllers.deleteUserDataById);

// delete all CART items
// router.delete();

module.exports = router;
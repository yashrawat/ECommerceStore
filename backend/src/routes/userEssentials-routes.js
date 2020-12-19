const express = require('express');

const userEssentialsControllers = require('../controllers/userEssentials-controllers');

const router = express.Router();

// Routes
// working, tested with postman
// get all user data by ID
router.get('/getUserEssentialsData/:authUserId', userEssentialsControllers.getUserEssentialsDataById);

// working, tested with postman
// adding new user's data
router.post('/addNewUsersData', userEssentialsControllers.addNewUsersData);

// working, tested with postman
// update existing user's data
router.put('/updateExistingUsersData/:id', userEssentialsControllers.updateExistingUsersData);

module.exports = router;


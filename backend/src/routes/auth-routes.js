const express = require('express');

const authController = require('../controllers/auth-controllers');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/getUserData/:id', authController.getUserData);
router.put('/saveUserData/:id', authController.saveUserData);

module.exports = router;

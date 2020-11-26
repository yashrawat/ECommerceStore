const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Auth = require('../models/auth-models');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const auth = new Auth({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            auth.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Invalid user input, signup failed' + err
                    });
                });
        });
};

exports.login = (req, res, next) => {
    let fetchedUser;
    Auth.findOne({ email: req.body.email })
        .then(auth => {
            if (!auth) {
                return res.status(401).json({
                    message: 'Authorization failed 1'
                });
            }
            fetchedUser = auth;
            return bcrypt.compare(req.body.password, auth.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Authorization failed 2'
                });
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, process.env.JWT_KEY, { expiresIn: '1h' });
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Invalid Authentication Credentials ' + err
            });
        });
};

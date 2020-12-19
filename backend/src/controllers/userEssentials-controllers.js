const UserEssentials = require('../models/userEssentials-models');

// working, tested with postman
// get all user data by ID
exports.getUserEssentialsDataById = (req, res, next) => {
    UserEssentials.findOne({ authUserId: req.params.authUserId })
        .then(fetchedUserEssentialsData => {
            if (fetchedUserEssentialsData) {
                res.status(200).json({
                    message: `Successfully fetched userEssentials data`,
                    userEssentialsData: fetchedUserEssentialsData
                });
            } else {
                res.status(404).json({
                    message: `Error! userEssentials data not found`
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: `Fetching userEssentials data failed => ${error}`
            });
        });
};

// working, tested with postman
// adding new user's data
exports.addNewUsersData = (req, res, next) => {
    const userEssentials = new UserEssentials({
        authUserId: req.body.authUserId,
        cart: req.body.cart,
        wishlist: req.body.wishlist,
        orderHistory: req.body.orderHistory
    });

    userEssentials.save()
        .then(savedUserEssentialsData => {
            res.status(200).json({
                message: `userEssentials data successfully added`,
                userEssentialsData: savedUserEssentialsData
            });
        })
        .catch(error => {
            res.status(500).json({
                message: `Could not save userEssentials data => ${error}`
            });
        });
};

// working, tested with postman
// update existing user's data
exports.updateExistingUsersData = (req, res, next) => {
    UserEssentials.findById({ _id: req.params.id }, (error, userEssentialsDataLoaded) => {
        if (!userEssentialsDataLoaded) {
            return next(new Error(`Could not load document => ${error}`));
        } else {
            userEssentialsDataLoaded.authUserId = req.body.authUserId;
            userEssentialsDataLoaded.cart = req.body.cart;
            userEssentialsDataLoaded.wishlist = req.body.wishlist;
            userEssentialsDataLoaded.orderHistory = req.body.orderHistory;

            userEssentialsDataLoaded.save()
                .then(updatedUserEssentialsData => {
                    res.status(200).json({
                        message: `userEssentials data updated successfully`,
                        userEssentialsData: updatedUserEssentialsData
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: `UserEssentials data could not be updated => ${error}`
                    });
                });
        }
    });
};
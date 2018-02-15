'use strict';

// The user controller.
var userController = {
    index: function(req, res) {
        res.status(200).json({ message: 'Welcome to the users area ' + req.user.username + '!' });
    }
};

module.exports = userController;
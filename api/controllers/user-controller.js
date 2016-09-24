var User = require('../models/user-model'),
    jwt = require('jsonwebtoken'),
    config = require('../config');

module.exports = {
    createUser: function(req, res) {
        var user = new User();

        user.login = req.body.login;
        user.password = req.body.password;
        User.findOne({
            'login': user.login
        }, function(err, existingUser) {
            if (!existingUser) {
                user.save();
                res.send({
                    'message': 'user created'
                })
            } else {
                res.send({
                    'message': 'user already exist'
                })
            }

        })
    },

    loginUser: function(req, res) {
        User.findOne({
            login: req.body.login
        }, function(err, user) {
            if (!user) {
                res.send({
                    'message': 'Wrong login!'
                });
            } else {
                if (user.password != req.body.password) {
                    res.send({
                        'message': 'Worong password!'
                    });
                } else {
                  var token = jwt.sign({
                    login: user.login
                  }, config.key)
                    res.json({
                      success: true,
                      token: token
                    })
                }
            }

        })
    },

    getAllUsers: function(req, res) {
        User.find({}, function(err, users) {
            if (err) res.send(err);
            res.json(users);
        });
    }
}

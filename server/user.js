var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/users');

router.post('/signup', function(req, res, next){
        var user = new User({
            email: req.body.email,
            pin: bcrypt.hashSync(req.body.pin, 10),
            confirmPin: req.body.confirmPin
        });

        user.save(function(err, result){
            if (err) {
                return res.status(500).json({
                    message: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'user saved',
                obj: result
            });
        });
});

router.post('/signin', function(req, res, next){
    User.findOne({email: req.body.email}, function(err, user){
        if (err) {
            return res.status(500).json({
                message: 'And error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                message: 'Failed to login',
                error: {message: 'Wrong credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.pin, user.pin)) {
            return res.status(501).json({
                message: 'Failed to login',
                error: {message: 'Wrong credentials'}
            })
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Succesfully loged in',
            token: token,
            userId: user._id
        })
     });
});

module.exports = router;
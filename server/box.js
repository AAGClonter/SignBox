var express = require('express');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var router = express.Router();

var Box = require('../models/box');
var Employee = require('../models/employee');
var Email = require('../models/email');
var ErasedBox = require('../models/erasedBoxes');
var User = require('../models/users');

//GET all the boxes
router.get('/boxes', function(req, res, next){
    Box.find()
        .populate('/user', 'boxSignedIn')
        .exec(function(err, boxes){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Messages found',
            obj: boxes
        });
    });
});
//POST a box
router.post('/boxsignin', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
        User.findById(decoded.user._id, function(err, user){
            if (err) {
                return res.status(500).json({
                    message: 'An error has occurred',
                    error: err
                });
            }

            var box = new Box({
                tracking: req.body.tracking,
                addressedTo: req.body.addressedTo,
                signedBy: req.body.signedBy,
                user: user
            });

            box.save(function(err, box){
                if (err) {
                    return res.status(500).json({
                        message: 'An error occurred',
                        error: err
                    });
                }
                user.boxesSignedIn.push(box);
                user.save();
                res.status(201).json({
                    message: 'Box created',
                    obj: box
                });
            });
        });   
});
//GET one box
router.get('/boxtonotify/:id', function(req, res, next){
    Box.findById(req.params.id, function(err, box){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Box found',
            obj: box
        });
    });
});

router.get('/boxtosignout/:id', function(req, res, next){
    Box.findById(req.params.id, function(err, box){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
       res.status(200).json({
           message: 'Box found',
           obj: box
       })
    });
});
//DELETE request for sign out
router.delete('/boxtosignout/:id/boxsignout', function(req, res, next){
    //var decoded = jwt.decode(req.query.token);
	Box.findByIdAndRemove(req.params.id, function(err, box){
		if (err) return next(err);
		res.status(200).json({
            message: 'Box deleted',
            obj: box
        });
	});
});
//POST request (erased box)
router.post('/boxtosignout/:id', function(req, res, next){
    Box.findById(req.params.id, function(err, box){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
            res.status(200).json({
                message: 'Box erased',
                obj: box
            });  
        });
    });
//PUT a box
router.patch('/boxtosignout/:id', function(req, res, next){
    Box.findById(req.params.id, function(err, box){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!box) {
            return res.status(500).json({
                title: 'No box found',
                error: {box: 'box not found'}
            });
        }
        box.signedBy = req.body.signedBy;
        box.save(function(err, result){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Box updated',
                obj: result
            });
        });
    });
});

//Notifying a box
router.post('/boxtonotify/:id/boxnotify', function(req, res, next){
    Box.findById(req.params.id, function(err, box){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        if (!box) {
            return res.status(500).json({
                message: 'Box not found',
                error: err
            });
        }
         var smtpTransport = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "sheldoneinsestein@gmail.com",
                        pass: "shel4583"
                    }
                });

                var email = new Email({
                    boxTracking: box.tracking,
                    boxEmployee: box.addressedTo
                });
                //Creating mail optinos
                var mailOptions = {
                    from: 'pandy_2013@hotmail.com', // sender address
                    to: 'andyalcantara745@yahoo.com', // list of receivers
                    subject: 'You have a box waiting for you', // Subject line
                    text: 'There is a box with the tracking:' + box.tracking + 'waiting for you',
                    html: '<p>This is a test</p>' // plain text body
                };

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(err, result){
            if (err) {
               console.log(err);
            }
            console.log(result.messageId + 'and' + result.response);
            email.save(function(err, email){
                if (err) return next(err);
                res.status(200).json({
                    message: 'Email saved',
                    obj: email
                });
            });
        });
    });
});

module.exports = router;
var express = require('express');
var nodemailer = require('nodemailer');
var async = require('async');
var jwt = require('jsonwebtoken');
var xoauth2 = require('xoauth2');
var router = express.Router();

var Box = require('../models/box');
var Employee = require('../models/employee');
var Email = require('../models/email');
var ErasedBox = require('../models/erasedBoxes');
var User = require('../models/users');

//GET all the boxes
router.get('/boxes', function(req, res, next){
    Box.find({}, function(err, boxes){
        if (err) {
           return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Boxes found',
            obj: boxes
        });
    });
});
//POST a box
router.post('/boxes', function(req, res, next){
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
                user: user
            });

            box.save(function(err, box){
                if (err) {
                    return res.status(500).json({
                        message: 'An error has occurred',
                        error: err
                    });
                }
                user.boxesSignedIn.push(box);
                user.save();
                res.status(200).json({
                    message: 'Box created',
                    obj: box
                });
            });
    });
});

//GET one box
router.get('/boxtonotify/:id/boxnotify', function(req, res, next){
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

//Getting the Employee through a box
router.get('/boxtosignout/:id/boxsignout', function(req, res, next){
    Box.findById(req.params.id, function(err, box){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Employee found',
            obj: box
        });
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

//Erase box and keep it in the databases
router.post('/boxtosignout/:id/boxsignout', function(req, res, next){
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

        var erasedBox = new ErasedBox({
            box: box,
            signedBy: req.body.signedBy
        });

        erasedBox.save(function(err, result){
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
    async.waterfall([
        function(callback){
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
                callback(null, box);
            });
        },
        function(box, callback){
            Employee.findOne({name: box.addressedTo}, function(err, employee){
                if (err) return next(err);
                if (!employee) {
                    return res.status(500).json({
                        message: 'Employee not found',
                        error: {employee: 'Employee not found'}
                    });
                }
                var email = new Email({
                    boxTracking: box.tracking,
                    boxEmployee: box.addressedTo
                });

                var smtpTransport = nodemailer.createTransport({
                    service: "gmail",
                    host: "gsmtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        xoauth2: xoauth2.createXOAuth2Generator({
                            user: "sheldoneinsestein@gmail.com",
                            //pass: "shel4583",
                            clientId: "459612530252-22upbserlv47oc95utdhi11nq2o809bm.apps.googleusercontent.com",
                            clientSecret: "nNXxJtQT5fjsmwu1GrwtDlFg",
                            //accessToken: "ya29.GltuBXRUJ3YtkJ9anWGwzUh-FWhjCTN7otF_iDM--9Ehu_dnwK1B6ACEu0nMWbY8XCNaqjM3XalPlzDSBRdh_zAFTRMkx-Oov5z5xN326jYsKiUp7Lefnsp1HHjx", 
                            refreshToken: "1/g0hu6G9anYfRG_-dpj1SztDZdVhDcgn9XiZpdCDnJ6yl67KKRHOorJrV4heuB47j"
                            //refreshToken: "1/Ft-3SGTku37rn--TtNjU27jn_JJvKlAi7y78ZC_NtT0",
                            //expires: 3600
                        })
                    }
                });

                //Creating mail optinos
                var mailOptions = {
                    from: 'pandy_2013@hotmail.com', // sender address
                    to: employee.email, // list of receivers
                    subject: 'You have a box waiting for you', // Subject line
                    text: 'There is a box with the tracking:' + box.tracking + ' waiting for you',
                    html: '<h2>Hello ' + employee.name + '</h2>' +
                          '<h4>A box addressed to you just arrived!!!</h4>' +
                          '<p>You can find it easily, its tracking number is ' + box.tracking + '</p>' +
                          '<p>Come and get it!! and do not forget to sign!! Thanks a lot!!</p>'
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
        }
    ]);
});
////////////////////////////////Employee related routes///////////////////////////
//Getting every employee
router.get('/employee', function(req, res, next){
    Employee.find({})
        .populate('employee')
        .exec(function(err, employees){
        if (err) {
            return res.status(500).json({
                message: 'An error has occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Employees found',
            obj: employees
        })
    });
});

router.post('/employees', function(req, res, next){
    var employee = new Employee({
        name: 'Andy Alcantara',
        email: 'andyalcantara745@yahoo.com'
    });

    employee.save(function(err, employee){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        }
        res.status(200).json({
            message: 'Employee saved',
            obj: employee
        });
    });
});

router.get('/boxemployees', function(req, res, next){
    Box.find({})
        .populate('employee')
        .exec(function(err, boxes){
            if (err) return next(err);
            res.status(200).json({
                message: 'Boxes with employees found',
                obj: boxes
            })
        })
});

module.exports = router;
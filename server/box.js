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
    Employee.find()
        .populate('box')
        .exec(function(err, employees){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Boxes found',
            obj: employees
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
                    user: user
                });

                box.save(function(err, box){
                    if (err) {
                        return res.status(500).json({
                            message: 'An error has occurred',
                            error: err
                        });
                    }
                    var employee = new Employee({
                        name: req.body.addressedTo,
                        box: box._id
                    });
                    user.boxesSignedIn.push(box);
                    user.save();
                    employee.save(function(err, employee){
                        if (err) return next(err);
                        res.status(200).json({
                            message: 'Everything ok',
                            obj: employee
                        });
                    });
                });
        });   
});
//GET one box
router.get('/boxtonotify/:id/boxnotify', function(req, res, next){
    Employee.findById(req.params.id)
            .populate('box')
            .exec(function(err, employee){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Box found',
            obj: employee
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
//Getting the Employee through a box
router.get('/boxtosignout/:id/boxsignout', function(req, res, next){
    Employee.findOne({box: req.params.id}, function(err, employee){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        employee.remove(function(err, employee){
            res.status(200).json({
                message: 'Employee found',
                obj: employee
            });
        });
    });
})
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
    Employee
        .findById(req.params.id)
        .populate('box')
        .exec(function(err, employee){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        if (!employee) {
            return res.status(500).json({
                message: 'Employee not found',
                error: err
            });
        }
        var email = new Email({
                    boxTracking: employee.box.tracking,
                    boxEmployee: employee.name
                });
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

                //Creating mail optinos
                var mailOptions = {
                    from: 'pandy_2013@hotmail.com', // sender address
                    to: employee.email, // list of receivers
                    subject: 'You have a box waiting for you', // Subject line
                    text: 'There is a box with the tracking:' + employee.box.tracking + ' waiting for you'
                    //html: '<p>This is a test</p>' // plain text body
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

module.exports = router;
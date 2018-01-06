var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/users');
var Item = require('../models/invItems');

// Adding items to inventory
router.post('/newItem', function(req, res, next){
    //var decoded = jwt.decode(req.query.token);
    //User.findById(decoded.user._id, function(err, user){
        var newItem = new Item({
            assortmentNumber: req.body.assortment,
            itemNumber: req.body.itemNumber,
            description: req.body.description,
            showsDesignated: false,
            donationDesignated: false,
            sampleDesignated: true
        });

        newItem.save(function(err, item){
            if (err) {
                return res.status(500).json({
                    message: 'An error occurred',
                    error: err
                });
            }
            //user.invItemSignedIn.push(item);
            //user.save();
            res.status(200).json({
                message: 'Item saved',
                obj: item
            });
        });
    //});
});

//List of Items in Inventory
router.get('/items', function(req, res, next){
    Item.find({}, function(err, items){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Items found',
            obj: items
        });
    });
});

//One item only
router.get('/item/:id', (req, res, next) => {
    Item.findById(req.params.id, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Item not found',
                error: err
            });
        }
        res.status(200).json({
            message: 'Item found',
            obj: item
        });
    });
});

module.exports = router;
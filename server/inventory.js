var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/users');
var Assortment = require('../models/invItems');
var Item = require('../models/invItem');

//Adding assortments
router.post('/assortments', function(req, res, next){
    var assortment = new Assortment({
        assortmentNumber: req.body.assortmentNumber,
        description: req.body.description
    });

    assortment.save(function(err, assortment){
        if (err) return next(err);
        res.status(200).json({
            message: 'Assortment created',
            obj: assortment
        });
    });
});

//Getting assortments from database
router.get('/assortments', function(req, res, next){
    Assortment.find({}, function(err, assortments){
                  if (err) return next(err);
                  res.status(200).json({assortments});
              });
});

//Selecting one assormtent
router.get('/:id/items', function(req, res, next){
    Assortment.findById(req.params.id, function(err, assortment){
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        Item.find({assortmentNumber: assortment.assortmentNumber}, function(err, items){
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
});
// Adding items to inventory
router.post('/newItem', function(req, res, next){
    //var decoded = jwt.decode(req.query.token);
    //User.findById(decoded.user._id, function(err, user){
        var newItem = new Item({
            assortmentNumber: req.body.assortment,
            itemNumber: req.body.itemNumber,
            description: req.body.description,
            date: Date.now()
        });

        newItem.save(function(err, item){
            if (err) {
                return res.status(500).json({
                    message: 'An error occurred',
                    error: err
                });
            }
            Assortment.find({assortmentNumber: item.assortmentNumber}, function(err, prodAssortment){
                if (err) return next(err);
                prodAssortment.assortment.push(item);
                prodAssortment.save();
                next();
            })
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
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var async = require('async');

var User = require('../models/users');
var Assortment = require('../models/invItems');
var Item = require('../models/invItem');

//Adding assortments
router.post('/assortment', function(req, res, next){
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
    Assortment.find({})
              .populate('items')
              .exec(function(err, assortments){
                  if (err) return next(err);
                  res.status(200).json({assortments});
              });
});

//Adding certain quantity to an Item
router.put('/assortments', function(req, res, next){
    Item.findOne({itemNumber: req.body.itemNumber}, function(err, item){
        if (err) {
            return res.status(500).json({
                message: 'An error occurrred',
                error: err
            });
        }

        if (!item) {
            return res.status(500).json({
                message: 'Item not found',
                error: { message: 'Item not found'}
            });
        }
        item.save(function(err, item){
            if (err) return next(err);
            item.quantity = (item.quantity + req.body.quantity);
            res.status(200).json({
                message: 'Item added',
                obj: item
            });
        });
    });
});

// Adding items to inventory
router.post('/newItem', function(req, res, next){
    //var decoded = jwt.decode(req.query.token);
    //User.findById(decoded.user._id, function(err, user){
        async.waterfall([
            function(callback){
                var newItem = new Item({
                    assortmentNumber: req.body.assortment,
                    itemNumber: req.body.itemNumber,
                    description: req.body.description,
                    quantity: req.body.quantity,
                    date: Date.now()
                });

                newItem.save(function(err, item){
                    if (err) {
                        return res.status(500).json({
                            message: 'An error occurred',
                            error: err
                        });
                    }
                    callback(null, item)
                });
            },
            function(item, callback){
                Assortment.findOne({assortmentNumber: item.assortmentNumber}, function(err, assortment){
                    if (err) return next(err);
                        assortment.items.push(item);
                        assortment.save();
                        res.status(200).json({
                            message: 'Item saved',
                            obj: item
                        });
                    });
                
            }
        ]);
        });
    //});

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

router.get('/prepareItem', function(req, res, next){
    Item.find({prepared: true}, function(err, items){
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

module.exports = router;
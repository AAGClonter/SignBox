const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const async = require('async');

const Assortment = require('../models/assortment');
const Item = require('../models/item');

// POST request new Assortment
router.post('/newAssortment', (req, res, next) => {
    let newAssortment = new Assortment({
        assortmentNumber: req.body.assortmentNumber,
        description: req.body.description,
        creationDate: Date.now()
    });

    newAssortment.save((err, assortment) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Assortment saved',
            obj: assortment
        });
    });
});

// POST request new Item
router.post('/newItem', (req, res, next) => {
    let newItem = new Item({
        assortment: req.body.assortment,
        itemNumber: req.body.itemNumber,
        description: req.body.description,
        quantity: req.body.quantity,
        creationDate: Date.now()
    });

    newItem.save((err, item) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Item saved',
            obj: item
        });
    });
});

module.exports = router;
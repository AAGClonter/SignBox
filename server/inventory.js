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

// GET request all assortments
router.get('/assortment', (req, res, next) => {
    Assortment.find({}, (err, assortments) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Found assortments',
            obj: assortments
        });
    });
});

// DELETE request /:id assortment
router.delete('/assortment/:id', (req, res, next) => {
    Assortment.findByIdAndRemove(req.params.id, (err, assortment) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Assortment Deleted',
            obj: assortment
        });
    });
});

// PUT request /:id assortment
router.put('/assortment/:id', (req, res, next) => {
    Assortment.findById(req.params.id, (err, assortment) => {
        if (err) return next(err);
        if (!assortment) {
            return res.status(404).json({
                message: 'Assortment not found',
                error: { message: 'Assortment not found'}
            });
        }
        assortment.assortmentNumber = req.body.assortmentNumber
        assortment.description = req.body.description
        assortment.save((err, assortment) => {
            if (err) return next(err);
            res.status(200).json({
                message: 'Assortment updated',
                obj: assortment
            });
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

// GET request all items
router.get('/items', (req, res, next) => {
    Item.find({}, (err, items) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Items found',
            obj: items
        });
    });
});

module.exports = router;
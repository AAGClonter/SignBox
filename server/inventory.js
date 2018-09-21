const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const async = require('async');
const multer = require('multer');

const Assortment = require('../models/assortment');
const Item = require('../models/item');
const Order = require('../models/order');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mimetype');
        if (isValid) {
            error = null;
        }
        cb(error, "/server/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

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
router.get('/assortments', (req, res, next) => {
    Assortment.find({}, (err, assortments) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Found assortments',
            obj: assortments
        });
    });
});

// DELETE request /:id assortment
router.delete('/assortments/:id', (req, res, next) => {
    Assortment.findByIdAndRemove(req.params.id, (err, assortment) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Assortment Deleted',
            obj: assortment
        });
    });
});

// GET request for specific assortment
router.get('/assortments/:id/detail', (req, res, next) => {
    Assortment.findById(req.params.id, (err, assortment) => {
        if (err) return next(err);
        if (!assortment) {
            return res.status(404).json({
                message: 'Assortment not found',
                error: { message: 'Assortment not found' }
            });
        }
        res.status(200).json({
            message: 'Assortment found',
            obj: assortment
        });
    });
});

// PUT request /:id assortment
router.put('/assortments/:id/update', (req, res, next) => {
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST request new Item
router.post('/newItem', multer({storage: storage}).single('image'), (req, res, next) => {
    
    let myItem = new Item({
        assortment: req.body.assortment,
        itemNumber: req.body.itemNumber,
        description: req.body.description,
        quantity: req.body.quantity,
        image: req.body.image
    });
    myItem.save((err, result) => {
        if (err) return next(err);
        res.send(result);
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


// PUT request update item
router.put('/items/:id/update', (req, res, next) => {
    Item.findById(req.params.id, (err, item) => {
        if (err) return next(err);
        item.assortment = req.body.assortment;
        item.itemNumber = req.body.itemNumber;
        item.description = req.body.description;
        item.quantity = req.body.quantity;
        item.save((err, item) => {
            if (err) return next(err);
            res.status(200).json({
                message: 'Item updated',
                obj: item
            });
        });
    });
});

// DELETE request for items
router.delete('/items/:id/delete', (req, res, next) => {
    Item.findById(req.params.id, (err, item) => {
        if (err) return next(err);
        item.remove((err, result) => {
            if (err) return next(err);
            res.status(200).json({
                message: 'Item deleted',
                obj: result
            });
        });
    });
});

// GET request for items 
router.get('/assortments/:id/details', (req, res, next) => {
    Assortment.findById(req.params.id, (err, assortment) => {
        if (err) return next(err);
        if (!assortment) {
            return res.status(404).json({
                message: 'Assortment was not found',
                error: {message: 'Assormtent was not found'}
            });
        }
        Item.find({assortment: assortment.assortmentNumber}, (err, items) => {
            if (err) return next(err);
            res.status(200).json({
                message: 'Items found',
                obj: items
            });
        });
    });
});

////////////////////////////////////////////ORDERS RELATED ROUTES////////////////////////////////////////////////

// POST request with items assigned
router.post('/newOrder', (req, res, next) => {
    let newOrder = new Order({
        orderNumber: req.body.orderNumber,
        requestedBy: req.body.requestedBy,
        retailer: req.body.retailer,
        boxWidth: req.body.boxWidth,
        boxLength: req.body.boxLength,
        boxHeight: req.body.boxHeight
    });

    newOrder.save((err, order) => {
        if (err) return next(err)
        res.status(200).json({
            message: 'Order Saved',
            obj: order
        });
    });
});


module.exports = router;
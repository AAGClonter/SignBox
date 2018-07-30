const express = require('express');
const router = express.Router();

const Order = require('../models/order');
const Item = require('../models/item');

// POST request creating a new order
router.post('/', (req, res, next) => {
    let newOrder = new Order({
        orderNumber: req.body.orderNumber,
        requestedBy: req.body.requestedBy,
        retailer: req.body.retailer,
        boxWidth: req.body.boxWidth,
        boxLength: req.body.boxLength,
        boxHeight: req.body.boxHeight
    });

    newOrder.save((err, order) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Order saved',
            obj: order
        });
    });
});

// GET request for orders
router.get('/', (req, res, next) => {
    Order.find({}, (err, orders) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Orders found',
            obj: orders
        });
    });
});

// GET request for one specific order
router.get('/:id/order', (req, res, next) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Order found',
            obj: order
        });
    });
});

//GET request for all the items
router.get('/', (req, res, next) => {
    Item.find({}, (err, items) => {
        if (err) return next(err);
        res.status(200).json({
            message: 'Items found',
            obj: items
        });
    });
});

// PUT request for one order
router.post('/:id/order', (req, res, next) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) return next(err);
        if (!order) {
            return res.status(404).json({
                message: 'Order could not be found',
                error: { message: 'Order could not be found'}
            });
        }
        order.items = req.body.items;

        order.save((err, updatedOrder) => {
            if (err) return next(err)
            res.status(200).json({
                message: 'Order successfully updated',
                obj: updatedOrder
            });
        });
    });
});

module.exports = router;
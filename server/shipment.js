const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Shipment = require('../models/shipment');
const Box = require('../models/box');
const User = require('../models/users');

router.post('/', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
        if (err) return next(err);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: { message: 'User could not be found'}
            });
        }
        let newShipment = new Shipment({
            from: req.body.from,
            addressedTo: req.body.addressedTo,
            numberOfBoxes: req.body.numberOfBoxes,
            date: Date.now(),
            masterTracking: req.body.masterTracking
        });
        
        user.save();
        newShipment.save((err, shipment) => {
            if (err) return next(err);
            res.status(200).json(shipment);
        });
    });
});

router.get('/', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({
                message: 'User not found',
                error: { message: 'You must be logged in'}
            });
        }

        Shipment.find({}, (err, shipments) => {
            if (err) return next(err);
            res.status(200).json(shipments);
        });
    });
});

router.get('/:masterTracking', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
        if (err) return next(err);

        if (!user) {
            return res.status(500).json({
                message: 'An error occurred',
                error: { message: 'User could not be found'}
            });
        }

        Box.find({masterTracking: req.params.masterTracking}, (err, boxes) => {
            if (err) return next(err);
            res.status(200).json(boxes);
        });
    });
});

router.get('/boxtosignout/:id/boxsignout', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
        if (err) return next(err);

        if (!user) {
            return res.status(500).json({
                message: 'An error occurred',
                error: { message: 'User could not be found'}
            });
        }
        Shipment.findById(req.params.id, (err, shipment) => {
            if (err) return next(err);

            if (!shipment) {
                return res.status(500).json({
                    message: 'An error occurred',
                    error: { message: 'Shipment could not be found'}
                });
            }

            res.status(200).json(shipment);
        })
    })
});

router.delete('/:id', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
        if (err) return next(err);
        if (!user) {
            return res.status(500).json({
                message: 'An error occurred',
                error: { message: 'An user could not be found'}
            });
        }

        Shipment.findById(req.params.id, (err, shipment) => {
            if (err) return next(err);
            if (!shipment) {
                return res.status(500).json({
                    message: 'An error occurred',
                    error: { message: 'Shipment was not found'}
                });
            }

            shipment.remove((err, shipment) => {
                if (err) return next(err);
                res.status(200).json(shipment);
            });
        });
    });
});

module.exports = router;
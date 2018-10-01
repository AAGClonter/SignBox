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
            masterTracking: req.body.masterTracking,
            boxes: []
        });
        
        user.shipmentSignedIn.push(newShipment);
        user.save();
        newShipment.save((err, shipment) => {
            if (err) return next(err);
            for (i = 0; i < shipment.numberOfBoxes; i++) {
                let newBox = new Box({
                    tracking: req.body.tracking,
                    addressedTo: req.body.addressedTo,
                    masterTracking: shipment._id
                });
                shipment.boxes.push(newBox);
            }
            res.status(200).json(shipment);
        });
    });
    
});

module.exports = router;
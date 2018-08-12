const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    from: { type: String, required: true },
    addressedTo: { type: [String], required: true },
    numberOfBoxes: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    tracking: { type: String, required: true }
});

module.exports = mongoose.model('Shipment', shipmentSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Box = require('./box');

const shipmentSchema = new Schema({
    from: { type: String, required: true },
    addressedTo: { type: String, required: true },
    numberOfBoxes: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    masterTracking: { type: String, required: true },
    boxes: [{ type: Schema.Types.ObjectId, ref: 'Box'}]
});

module.exports = mongoose.model('Shipment', shipmentSchema);
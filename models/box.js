const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shipment = require('./shipment');

var schema = new Schema({
    tracking: { type: String, required: true },
    addressedTo: { type: String, require: true },
    masterTracking: { type: Schema.Types.ObjectId, ref: 'Shipment'}
});

module.exports = mongoose.model('Box', schema);
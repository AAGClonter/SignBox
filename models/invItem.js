var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Assortment = require('./invItems');

var schema = new Schema({
    assortmentNumber: { type: Number, required: true },
    itemNumber: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Item', schema);
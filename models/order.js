const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = require('./item');

const orderSchema = new Schema({
    requestedBy: { type: String, required: true },
    retailer: { type: String, required: true },
    products: [{ type: Item, required: true }]
});

module.exports = mongoose.model('Order', orderSchema);
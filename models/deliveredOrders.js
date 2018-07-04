const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = require('./order');

const deliveredOrderSchema = new Schema({
    delivered: [{ type: Order }],
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Order', orderSchema);
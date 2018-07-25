const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = require('./item');

const orderSchema = new Schema({
    orderNumber: { type: Number, required: true},
    requestedBy: { type: String, required: true },
    retailer: { type: String, required: true },
    boxWidth: { type: Number, required: true },
    boxLength: { type: Number, required: true },
    boxHeight: { type: Number, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

orderSchema.methods.calcVolume = function() {
    return (orderSchema.boxLength * orderSchema.boxWidth * orderSchema.boxHeight);
}

module.exports = mongoose.model('Order', orderSchema);
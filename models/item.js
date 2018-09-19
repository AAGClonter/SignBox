const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order'},
    assortment: { type: Number, required: true },
    itemNumber: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    creationDate: { type: Date, default: Date.now },
    image: { type: String }
});

module.exports = mongoose.model('Item', itemSchema);
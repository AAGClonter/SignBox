var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = require('./invItem');

var schema = new Schema({
    assortmentNumber: { type: Number, required: true },
    description: { type: String, required: true },
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

module.exports = mongoose.model('Assortment', schema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    assortmentNumber: { type: Number },
    itemNumber: { type: Number, required: true },
    description: { type: String, required: true },
    showsDesignated: { type: Boolean, required: true },
    donationDesignated: { type: Boolean, required: true },
    sampleDesignated: { type: Boolean, required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Item', schema);
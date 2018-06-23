const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assortmentSchema = new Schema({
    assortmentNumber: { type: Number, required: true },
    description: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assortment', assortmentSchema);
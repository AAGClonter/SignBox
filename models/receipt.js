const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Box = require('./box');
const User = require('./users');

let boxesReceiptSchema = new Schema({
    boxes: [{ type: Box, required: true }],
    user: { type: User, required: true },
    from: { type: String, required: true },
    addressedTo: { type: Employee, required: true }
});

module.exports = mongoose.model('Receipt', boxesReceiptSchema);

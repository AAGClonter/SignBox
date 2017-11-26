var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Box = require('./box');

var schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: false },
    box: { type: Schema.Types.ObjectId, ref: 'Box'}
})

module.exports = mongoose.model('Employee', schema);
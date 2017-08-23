var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Box = require('./box');

var schema = new Schema({
    name: { type: String },
    email: { type: String, required: true },
    boxes: [{type: Schema.Types.String, ref: 'Box'}]
})

module.exports = mongoose.model('Employee', schema);
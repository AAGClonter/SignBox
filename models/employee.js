var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Box = require('./box');

var schema = new Schema({
    name: { type: String },
    email: { type: String, required: true }
})

module.exports = mongoose.model('Employee', schema);
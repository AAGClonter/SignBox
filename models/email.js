var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Box = require('./box');
var Employee = require('./employee');

var schema = new Schema({
    boxTracking: { type: String, ref: 'Box' },
    boxEmployee: { type: String, ref: 'Employee'}
});

module.exports = mongoose.model('Email', schema);
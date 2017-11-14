var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Box = require('./box');
var Employee = require('./employee');

var schema = new Schema({
    box: { type: Schema.Types.ObjectId, ref: 'Box' },
    signedBy: { type: String, ref: 'Employee'}
});

module.exports = mongoose.model('ErasedBox', schema);
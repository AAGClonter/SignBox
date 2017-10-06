var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = require('./employee');
var User = require('./users');

var schema = new Schema({
    tracking: { type: String, required: true },
    addressedTo: { type: String, required: true },
    signedBy: { type: String, ref: 'Employee' },
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Box', schema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = require('./employee');
var User = require('./users');

var schema = new Schema({
    tracking: { type: String, required: true },
    addressedTo: { type: String, require: true },
    employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Box', schema);
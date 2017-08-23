var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = require('./employee');

var schema = new Schema({
    tracking: { type: String, required: true },
    addressedTo: [{ type: Schema.Types.String, ref: "Employee" }],
    signedBy: { type: String } 
});

module.exports = mongoose.model('Box', schema);
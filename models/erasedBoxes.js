var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    tracking: { type: String },
    addressedTo: { type: String },
    signedBy: { type: String, required: true}
});

module.exports = mongoose.model('ErasedBox', schema);
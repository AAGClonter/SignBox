const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    tracking: { type: String, required: true },
    addressedTo: { type: String, require: true },
    masterTracking: { type: String, required: true}
});

module.exports = mongoose.model('Box', schema);
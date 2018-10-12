const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    tracking: { type: String, required: true },
    addressed: { type: String, require: true },
    masterTracking: { type: String }
});

module.exports = mongoose.model('Box', schema);
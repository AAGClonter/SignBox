var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Box = require('./box');

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
    boxesSignedIn: [{ type: Schema.Types.ObjectId, ref: "Box"}]
});

module.exports = mongoose.model('User', userSchema);
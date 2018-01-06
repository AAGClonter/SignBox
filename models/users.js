var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Box = require('./box');
var Item = require('./invItems');

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
    boxesSignedIn: [{ type: Schema.Types.ObjectId, ref: "Box"}],
    invItemSignedIn: [{ type: Schema.Types.ObjectId, ref: "Item"}]
});

module.exports = mongoose.model('User', userSchema);
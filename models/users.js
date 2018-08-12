var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Box = require('./box');

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
    boxesSignedIn: [{ type: Schema.Types.ObjectId, ref: "Box"}],
    invItemSignedIn: [{ type: Schema.Types.ObjectId, ref: "Item"}],
    shipmentsSignedIn: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAlgolia = require('mongoose-algolia');

var Employee = require('./employee');
var User = require('./users');

var schema = new Schema({
    tracking: { type: String, required: true },
    addressedTo: { type: String, require: true },
    employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

schema.plugin(mongooseAlgolia, {
    appId: '',
    apiKey: '',
    indexName: '',
    selector: '',
    populate: {
        path: '',
        select: ''
    },
    defaults: {},
    mappings: {},
    virtuals: {}
})

module.exports = mongoose.model('Box', schema);
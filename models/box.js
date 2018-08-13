const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAlgolia = require('mongoose-algolia');

var Employee = require('./employee');
var User = require('./users');

var schema = new Schema({
    tracking: [{ type: String, required: true }],
    addressedTo: [{ type: String, require: true }]
});

/*
schema.plugin(mongooseAlgolia, {
    appId: 'Y35L6PLLI4',
    apiKey: '2b68d36f76f36617e8777d4c18c59fdc',
    indexName: 'dev_boxesinv',
    selector: '_id tracking addressedTo employee',
    populate: {
        path: '',
        select: ''
    },
    defaults: {},
    mappings: {},
    virtuals: {}
})
*/
module.exports = mongoose.model('Box', schema);
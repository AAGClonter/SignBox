var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var async = require('async');

var User = require('../models/users');
var Assortment = require('../models/invItems');
var Item = require('../models/invItem');


module.exports = router;
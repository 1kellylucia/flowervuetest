'use strict';

var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
        id: Number,
        o_flowers: String,
        OrderAmount: Number

}, { collection: 'orders' });
var ok = mongoose.model('Order', OrderSchema);
module.exports = ok;
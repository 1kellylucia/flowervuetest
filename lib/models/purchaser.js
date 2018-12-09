'use strict';

var mongoose = require('mongoose');

var PurchaserSchema = new mongoose.Schema({
        //id: Number,
        PurchaserName: String,
        P_flowers: String,
        funds: Number

}, { collection: 'purchaser' });
var ok = mongoose.model('Purchaser', PurchaserSchema);
module.exports = ok;
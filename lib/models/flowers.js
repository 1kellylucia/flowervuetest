'use strict';

var mongoose = require('mongoose');

var FlowerSchema = new mongoose.Schema({
        //id: Number,
        flower_: String,
        amount: Number,
        prize: Number,
        uplikes: { type: Number, default: 0 }
}, { collection: 'flowers' });
var ok = mongoose.model('Flower', FlowerSchema);
module.exports = ok;
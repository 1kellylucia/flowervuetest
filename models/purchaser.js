let mongoose = require('mongoose');

let PurchaserSchema = new mongoose.Schema({
        //id: Number,
        PurchaserName: String,
        P_flowers: String ,
        funds: Number,
        password: String

    },
    { collection: 'purchaser' });
var ok = mongoose.model('Purchaser', PurchaserSchema);
module.exports = ok;

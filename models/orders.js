let mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
        //id: Number,
        o_flowers: String,
        OrderAmount: Number,

    },
    { collection: 'orders' });
let ok = mongoose.model('Order',OrderSchema);
module.exports = ok;
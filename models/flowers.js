let mongoose = require('mongoose');

let FlowerSchema = new mongoose.Schema({
        //id: Number,
        flower_: String,
        amount: Number,
        prize: Number ,
        uplikes: {type: Number, default: 0}
    },
    { collection: 'flowers' });
    let ok = mongoose.model('Flower',FlowerSchema);
    module.exports = ok;
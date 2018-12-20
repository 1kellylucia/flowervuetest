let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        //id: Number,
        username: String,
        password: String

    },
    { collection: 'users' });
var ok = mongoose.model('User', UserSchema);
module.exports = ok;

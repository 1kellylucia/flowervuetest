'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Purchaser = require('../models/purchaser');
var mongodbUri = 'mongodb://floweradmin:flower123@ds235328.mlab.com:35328/flowerstoredb';
mongoose.connect(mongodbUri, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});

router.findAll = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Purchaser.find(function (err, purchasers) {
        if (err) res.send(err);
        res.send(JSON.stringify(purchasers, null, 5));
    });
};

router.findOne = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Purchaser.find({ "PurchaserName": req.params.PurchaserName }, function (err, purchasers) {
        if (err) res.send('This purchaser is NOT Found!!');else res.send(JSON.stringify(purchasers, null, 5));
    });
};

router.addPurchaser = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var purchaser = new Purchaser();
    purchaser.PurchaserName = req.body.PurchaserName;
    purchaser.P_flowers = req.body.P_flowers;
    purchaser.funds = req.body.funds;
    purchaser.save(function (err) {
        if (err) res.json({ message: 'this purchaser NOT Added!', errmsg: err });else var F1 = { message: 'success', purchaser: purchaser };
        res.send(JSON.stringify(F1, null, 5));
    });
};

/*router.addLikes = (req, res) => {
    let likeFlower = req.body.likes;
    let flower = new Flowers();
    var found = Flowers.find({"flowertype":req.params.likes},function(err,likes){
        if(err)
            return null;
        else
            return likes;
    });
    if (likeFlower === found) {
        flower.uplikes += 1;
        res.json({status : 200, message : 'Uplike this flower Successful'  });
    }
    else
        res.send('like NOT be up Successful!!');
};*/

router.deletePurchaser = function (req, res) {
    Purchaser.findOneAndRemove({ "PurchaserName": req.params.PurchaserName }, function (err) {
        if (err) res.send({ message: 'Purchaser NOT DELETED!' });else res.json({ message: 'Purchaser Successfully Deleted!' });
    });
};
module.exports = router;
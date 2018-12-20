'use strict';

var Flowers = require('../models/flowers');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
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
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Flowers.find(function (err, flowers) {
        if (err) res.send(err);
        res.send(JSON.stringify(flowers, null, 5));
    });
};

router.editFlower = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Flowers.findById(req.params._id, function (err, flower) {
        if (err) res.send(err);
        flower.flower_ = req.body.flower_;
        flower.prize = req.body.prize;
        flower.amount = req.body.amount;
        flower.save(function (err) {
            if (err) res.send(err);
            res.json({ message: 'flower updated!' });
        });
    });
};

router.findByName = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.flower_;
    var _filter = {
        $or: [{ flower_: { $regex: keyword, $options: '$i' } }]
    };
    var count = 0;
    Flowers.countDocuments(_filter, function (err, doc) {
        if (err) {
            res.send({ message: 'FLOWER NOT founded!' });
        } else {
            count = doc;
        }
    });
    Flowers.find(_filter).limit(10).exec(function (err, flowers) {
        if (err) {
            res.send({ message: 'FLOWER NOT founded!' });
        } else {
            res.send(flowers);
        }
    });
};
router.findOne = function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    Flowers.find({ "_id": req.params._id }, function (err, flowers) {

        if (err) res.send({ message: 'This flower is NOT Found!!' });else res.send(JSON.stringify(flowers, null, 5));
    });
};

router.addFlower = function (req, res) {
    //Add a new donation to our list
    res.setHeader('Content-Type', 'application/json');
    var flower = new Flowers();
    flower._id = req.body._id;
    flower.flower_ = req.body.flower_;
    flower.amount = req.body.amount;
    flower.prize = req.body.prize;
    flower.save(function (err) {
        if (err) res.json({ message: 'this flower NOT Added!', errmsg: err });else var F1 = { message: 'success', flower: flower };
        res.send(JSON.stringify(F1, null, 5));
    });
};
router.incrementUplikes = function (req, res) {
    Flowers.findById(req.params._id, function (err, flower) {

        if (err) {
            res.json({ message: 'flower NOT Found!', errmsg: err });
        } else {

            flower.uplikes += 1;
            flower.save(function (err) {
                if (err) res.json({ message: 'flower NOT UpLiked!', errmsg: err });else res.json({ message: 'flower Successfully UpLiked!', data: flower });
            });
        }
    });
};
router.deleteFlower = function (req, res) {
    Flowers.findByIdAndRemove(req.params._id, function (err) {
        if (err) res.send({ message: 'flowers NOT DELETED!' });else res.json({ message: 'flowers Successfully Deleted!' });
    });
};
router.findTotalLikes = function (req, res) {
    var likes = getTotalLikes(Flowers);
    res.json({ totalLikes: likes });
};
router.findMore = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Flowers.aggregate([{
        $lookup: {
            from: 'orders',
            localField: "flowers_",
            foreignField: "o_flowers",
            as: "order_flowers"
        }
    }, {
        $lookup: {
            from: 'purchaser',
            localField: "flowers_",
            foreignField: "P_flowers",
            as: "purchaser_flowers"
        }
    }], function (err, flower) {
        if (err) {
            res.send({ message: 'flower NOT founded!' });
        } else {
            var F2 = { message: 'success', flower: flower };
            res.send(JSON.stringify(F2, null, 5));
        }
    });
};
module.exports = router;
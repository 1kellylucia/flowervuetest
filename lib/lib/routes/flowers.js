'use strict';

var _flowers = require('../models/flowers');

var _flowers2 = _interopRequireDefault(_flowers);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();
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
    _flowers2.default.find(function (err, flowers) {
        if (err) res.send(err);
        res.send(JSON.stringify(flowers, null, 5));
    });
};

router.findByName = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.flower_;
    var _filter = {
        $or: [{ flower_: { $regex: keyword, $options: '$i' } }]
    };
    var count = 0;
    _flowers2.default.countDocuments(_filter, function (err, doc) {
        if (err) {
            res.send({ message: 'FLOWER NOT founded!' });
        } else {
            count = doc;
        }
    });
    _flowers2.default.find(_filter).limit(10).exec(function (err, flowers) {
        if (err) {
            res.send({ message: 'FLOWER NOT founded!' });
        } else {
            res.send(flowers);
        }
    });
};
router.findOne = function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    _flowers2.default.find({ "_id": req.params._id }, function (err, flowers) {

        if (err) res.send({ message: 'This flower is NOT Found!!' });else res.send(JSON.stringify(flowers, null, 5));
    });
};

router.addFlower = function (req, res) {
    //Add a new donation to our list
    res.setHeader('Content-Type', 'application/json');
    var flower = new _flowers2.default();
    flower.flower_ = req.body.flower_;
    flower.amount = req.body.amount;
    flower.prize = req.body.prize;
    flower.save(function (err) {
        if (err) res.json({ message: 'this flower NOT Added!', errmsg: err });else var F1 = { message: 'success', flower: flower };
        res.send(JSON.stringify(F1, null, 5));
    });
};
router.incrementUplikes = function (req, res) {
    _flowers2.default.findById(req.params._id, function (err, flower) {
        if (err) res.json({ message: 'flower NOT Found!', errmsg: err });else {
            flower.uplikes += 1;
            flower.save(function (err) {
                if (err) res.json({ message: 'flower NOT UpLiked!', errmsg: err });else res.json({ message: 'flower Successfully UpLiked!', data: flower });
            });
        }
    });
};
router.deleteFlower = function (req, res) {
    _flowers2.default.findByIdAndRemove(req.params._id, function (err) {
        if (err) res.send({ message: 'flowers NOT DELETED!' });else res.json({ message: 'flowers Successfully Deleted!' });
    });
};
router.findTotalLikes = function (req, res) {
    var likes = getTotalLikes(_flowers2.default);
    res.json({ totalLikes: likes });
};
router.findMore = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    _flowers2.default.aggregate([{
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
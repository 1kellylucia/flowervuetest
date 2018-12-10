let Flowers = require('../models/flowers');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var mongodbUri = 'mongodb://floweradmin:flower123@ds235328.mlab.com:35328/flowerstoredb';
mongoose.connect(mongodbUri,{ useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});
router.findAll = (req, res) => {
    // Return a JSON representation of our list
     res.setHeader('Content-Type','application/json');
    Flowers.find(function(err,flowers){
        if(err)
            res.send(err);
        res.send(JSON.stringify(flowers,null,5));
    });
};
let findById = (arr, id) => {
    let result  = arr.filter(function(o) { return o.id === id;} );
    return result ? result[0] : null; // or undefined
}
router.editFlower = (req, res) => {
    let flower =  findById(Flowers, req.params._id ) ;
    if (!flower)
        res.json({ message: 'Flower NOT Found!'} );
    else {
        flower.flower_ = req.body.flower_;
        flower.amount = req.body.amount;
        flower.prize = req.body.prize;
        res.json({ message: 'Flower Successfully UpDated!', data: flower });
    }
};

router.findByName = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    let keyword = req.params.flower_;
    let _filter = {
        $or: [
            {flower_ : {$regex : keyword, $options: '$i'}}
        ]
    };
    let count = 0;
    Flowers.countDocuments(_filter,function (err,doc) {
        if(err){
            res.send({message: 'FLOWER NOT founded!'});
        }else{
            count =doc;
        }

    });
    Flowers.find(_filter).limit(10).exec(function (err,flowers) {
        if (err) {
            res.send({message: 'FLOWER NOT founded!'});
        } else {
            res.send(flowers);
        }
    });
};
router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Flowers.find({"_id": req.params._id},function(err,flowers) {


        if (err)
            res.send({message:'This flower is NOT Found!!'});
        else
            res.send(JSON.stringify(flowers, null, 5));
    });
};

router.addFlower = (req, res) => {
    //Add a new donation to our list
    res.setHeader('Content-Type','application/json');
    let flower = new Flowers();
    flower.flower_ = req.body.flower_;
    flower.amount = req.body.amount;
    flower.prize = req.body.prize;
    flower.save(function(err)
    {
        if (err)
            res.json({message: 'this flower NOT Added!',errmsg : err });
        else
           var F1={message:'success',flower};
            res.send(JSON.stringify(F1, null, 5));
    });
};
router.incrementUplikes = (req, res) => {
    Flowers.findById(req.params._id, function(err,flower) {
        if (err)
            res.json({ message: 'flower NOT Found!', errmsg : err } );
        else {
            flower.uplikes += 1;
            flower.save(function (err) {
                if (err)
                    res.json({ message: 'flower NOT UpLiked!', errmsg : err } );
                else
                    res.json({ message: 'flower Successfully UpLiked!', data: flower });
            });
        }
    });
};
router.deleteFlower = (req, res) => {
    Flowers.findByIdAndRemove(req.params._id, function(err) {
        if (err)
            res.send({ message: 'flowers NOT DELETED!' } );
        else
            res.json({ message: 'flowers Successfully Deleted!'});
    });
};
router.findTotalLikes = (req, res) => {
    let likes = getTotalLikes(Flowers);
    res.json({totalLikes :likes});
};
router.findMore = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Flowers.aggregate([{
        $lookup:{
            from:'orders',
            localField: "flowers_",
            foreignField:"o_flowers",
            as:"order_flowers"
        }
    },
        {
            $lookup:{
                from:'purchaser',
                localField: "flowers_",
                foreignField:"P_flowers",
                as:"purchaser_flowers"
            }
        }],function (err,flower) {
        if (err) {
            res.send({message: 'flower NOT founded!'});
        } else {
            var F2={message:'success',flower};
            res.send(JSON.stringify(F2, null, 5));
        }
    });
};
module.exports = router;

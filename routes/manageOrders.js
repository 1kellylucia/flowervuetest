let Order = require('../models/orders');
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
    Order.find(function(err,Order){
        if(err)
            res.send(err);
        res.send(JSON.stringify(Order,null,5));
    });

};
router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Order.find({"_id": req.params._id},function(err,Order) {
        if (err != null)
            res.send(JSON.stringify(Order, null, 5));
        else
            res.send('This order is NOT Found!!');
    });

};

/*function getByValue(array, _id) {
    let result  = array.filter(function(obj){return obj._id === _id;} );
    return result ? result[0] : null; // or undefined
}
function addlikes(flowers,amount){
    let flower =new Flowers();
    if (flower.flowertype === flowers) {
        flower.uplikes += amount;
    }

};
function removelikes(flowers,amount){
    let flower = new flowers();
    if(flower.flowertype === flowers){
        flower.uplikes -= amount;
    }
}*/
router.addOrder = (req, res) => {
    res.setHeader('Content-Type','application/json');
    let order = new Order();
    order.o_flowers = req.body.o_flowers;
    order.OrderAmount = req.body.OrderAmount;


    order.save(function(err)
    {
        if (err)
            res.json({message: 'this order NOT Added!',errmsg : err });
        else
            var F1={message:'success',order};
        res.send(JSON.stringify(F1, null, 5));
    });
};
router.deleteOrder = (req, res) => {
    Flowers.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send({ message: 'order NOT Deleted!' } );
        else
            res.json({ message: 'order Deleted!'});
    });

};
module.exports = router;
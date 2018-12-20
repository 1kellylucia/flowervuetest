var express = require("express")
var router = express.Router()
let Users = require('../models/users');

/* GET users listing. */
router.get("/", function(req, res, next) {
	res.send("respond with a resource")
})
router.get("/user",function(req,res,next){
    res.setHeader('Content-Type','application/json');
    let user = new Users();
    user.username = 'admin@123.com';
    user.password = '123456';
    Users.find(function(err,user){
        if (err)
            res.json({message: 'not get user',errmsg : err });
        else
        res.send(JSON.stringify(user, null, 5));
    });

})
router.Checkuser = (req, res) => {
    if(req.params.username === 'admin@123.com' && req.params.password === '123456' ){
        res.send({state:"ok",msg:"登陆成功"});
    }else{
        res.sendStatus(401);
    }
};
module.exports = router

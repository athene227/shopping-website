var express = require('express'),
    router = express.Router(),
    store = require('./store'),
    jwt = require('jsonwebtoken'),
    status = require('../constants/ajaxStatus'),
    response = require('./response'),
    mongo = require('../mongo');

router.get('/', function (req, res) {
    /*var token = req.body.token || req.header['token'] || req.query['token'];
    if(!token) return res.json({
        err: "please insert a token"
    });
    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        if(err){
            res.status(404).json({
                err: "invalid token"
            });
        }else{
            return res.status(200).json({
                users: store.users
            });
        }
    });*/
    mongoClient.connect(serverConfig.mongoURL, function(err, db){
        if(err){
            console.log(err);
            res.send("Error happened while connecting to the database");
        }else {
            /*db.collection("women_products").findOne({"username":req.body.username, "password": req.body.password}, function (err, result) {
                if(result){
                    req.session.loguser = result;
                    res.send("successful");
                }else {
                    res.send("fail");
                }
                db.close();
            })*/
            console.log(req.query);
            res.send({name:"test"});
        }
    });
});

router.post('/getAll', function (req, res) {
    var token = req.body.token || req.header['token'] || req.query.token;
    if(!token) return response.send(res, status.NO_TOKEN);
    console.log("body: ", req.body, "query: ", req.body);

    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        if(err){
            response.send(res, status.INVALID_TOKEN);
        }else{
            mongo.findAll('product', {}, function (data) {
                return response.send(res, status.SUCCESSFUL, data);
            }, function () {
                return response.send(res, status.UNSUCCESSFUL);
            });
        }
    });
});

router.post('/', function (req, res) {
    var token = req.body.token || req.header['token'];
    if(!token) return res.json({
        err: "please insert a token"
    });
    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        if(err){
            res.status(500).json({
                err: "invalid token"
            });
        }else{
            if(!('username' in req.body) || !('birthday' in req.body) || !('location' in req.body)){
                return res.status(404).json({
                    err: "please provide with valid"
                });
            }
            for(var key in req.body){
                if(req.body[key] == ""){
                    return res.status(404).json({
                        err: "please provide with valid " + key
                    });
                }
            }
            var len = store.users.length;
            store.users.push({
                id: len+1,
                username: req.body.username,
                birthday: req.body.birthday,
                location: req.body.location
            });
            return res.status(200).json({
                succ: "post user successfully!"
            });
        }
    });
});

module.exports = router;
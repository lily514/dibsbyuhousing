var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/sellcontract', function(req, res, next){
	res.sendFile(path.join(__dirname+'/../public/sellcontract.html'));
});


router.get('/signin', function(req, res, next){
    res.sendFile(path.join(__dirname+'/../public/signin.html'));
    //res.render('signing');
});

router.get('/browse', function(req, res, next){
	console.log("in browse");
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

router.get('/contract', function(req, res, next){
    res.sendFile(path.join(__dirname+'/../public/contract.html'));
});


router.get('/contract/:tagId', function(req, res) {
  res.send("tagId is set to " + req.params.tagId);
  res.render('contract');
});


router.get('/widget', function(req, res, next){
    res.sendFile(path.join(__dirname+'/../public/widget.html'));
});

router.get('/index', function(req, res, next){
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});


// router.post('/sellcontract', function(req, res, next){
// 	console.log("In post contract");
// 	// var uid= firebase.auth().currentUser.uid;
// 	// console.log(uid);
// 	// writeNewContract(uid, req.body);
// 	// if(err){ return next(err); }

// });



module.exports = router;

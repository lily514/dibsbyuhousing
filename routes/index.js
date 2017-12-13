var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/sellcontract', function(req, res, next){
	res.sendFile(path.join(__dirname+'/../public/sellcontract.html'));
});


router.get('/signin', function(req, res, next){
    res.sendFile(path.join(__dirname+'/../public/signin.html'));
});

router.get('/browse', function(req, res, next){
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

router.get('/widget', function(req, res, next){
    res.sendFile(path.join(__dirname+'/../public/widget.html'));
});

router.get('/index', function(req, res, next){
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});


router.post('/sellcontract', function(req, res, next){
	console.log("In post contract");
	// var uid= firebase.auth().currentUser.uid;
	// console.log(uid);
	// writeNewContract(uid, req.body);
	// if(err){ return next(err); }

});



module.exports = router;

var express = require('express');
var router = express.Router();
var path = require("path");

var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCQAyCFCa22iH5QwsvvLFrBUKE3f6kI0is",
    authDomain: "photobook-621dd.firebaseapp.com",
    databaseURL: "https://photobook-621dd.firebaseio.com",
    projectId: "photobook-621dd",
    storageBucket: "photobook-621dd.appspot.com",
    messagingSenderId: "291412252600"
  };
firebase.initializeApp(config);

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

//Create new user
router.post('/user', function(req, res, next) {
	console.log("post user");

	var newUserEmail = req.body['email'];
	var newUserPass = req.body['password'];
	console.log("email "+ newUserEmail);
    //auth
    firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPass)
        //get back promise, log user object's email address
        .then(function (user) {
            console.log("Success!! " + user.email)
        })
        //log error
        .catch(function (error) {
            console.log(error);
        })

});

//Perform authentication
router.post('/signin', function(req, res){

	var userEmail = req.headers['user-email'];
	var userPassword = req.headers['user-pass'];

    firebase.auth().signInWithEmailAndPassword(newUserEmail, newUserPass)
        //get back promise, log user object's email address
        .then(function (user) {
            console.log("Success!! " + user.email)
        })
        //log error
        .catch(function (error) {
            console.log(error);
        })
});




module.exports = router;

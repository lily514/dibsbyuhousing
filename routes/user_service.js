var Firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCQAyCFCa22iH5QwsvvLFrBUKE3f6kI0is",
    authDomain: "photobook-621dd.firebaseapp.com",
    databaseURL: "https://photobook-621dd.firebaseio.com",
    projectId: "photobook-621dd",
    storageBucket: "photobook-621dd.appspot.com",
    messagingSenderId: "291412252600"
  };
var firebaseRef = Firebase.initializeApp(config);

function addUser(email, password, callback) {
	console.log("firebase "+ email + password);
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(error.message);
		  // ...
		});
	// firebaseRef.auth().createUser({

	// 	email : email,
	// 	password : password
	
	// }, function(error, userData) {
		
	// 	console.log(error);
	// 	console.log(userData.uid)
	// 	callback(error, userData.uid);

	// });
}


function authenticate(email, password, callback) {

	firebaseRef.authWithPassword({
	
		email : email, 
		password : password
	
	}, function(error, authData) {
	
		callback(error, authData);

	});

}

module.exports = {

	addUser : addUser,
	authenticate : authenticate

}

angular.module('dibs-user', [])

.controller('MainCtrl', [
'$scope','$http',
function($scope, $http) {
  $scope.login = false;
  $scope.create = function(user) {
  	return $http.post('/user', user).success(function(data){
		$scope.login = true;
	});
  };
  $scope.loginRegister = function(){

	if ($scope.email === '') {return;}
	if ($scope.password === '') {return;}
	console.log("register user");
	console.log($scope.email);
	$scope.create({
		email: $scope.email,
		password: $scope.password,
        });
  };

 //  $scope.getSongs = function() {
	// return $http.get('/songs').success(function(data) { 
	// 	$scope.songList = data;
	// });
 //  };
 //  $scope.playSong = function(song) {
	// console.log("playing . . .");
	// var i = 1;
	// song.song.forEach(function(note) {
	//   console.log("delay: "+700*i);
	//   setTimeout( 
	// 	function(note) {
 //        	  console.log(note);
 //        	  $scope.audio[note].play();
 //  		}, 700*i, note);  
	//   i += 1;
	// }); 
 //  };

  angular.element(document).ready(function () {
	
	console.log("hello");

   });//end of document ready

  }//end of function
]); //end of module

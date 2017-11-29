$( document ).ready(function() {
    'use strict';
    console.log("document ready");
    var dropZone = document.getElementById('drop-zone')
});

var submitUpload = function(e){
	var uploadFiles = document.getElementById('js-upload-files').files;
    e.preventDefault();
    startUpload(uploadFiles);
};

var startUpload = function(files) {
    console.log(files);
    //TODO: add to list
};

var ondrop = function(e) {
        e.preventDefault();
        document.getElementById('drop-zone').className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

var ondragover = function() {
        document.getElementById('drop-zone').className = 'upload-drop-zone drop';
        return false;
    }

var ondragleave = function() {
        document.getElementById('drop-zone').className = 'upload-drop-zone';
        return false;
    }


angular.module('contract', [])
.controller('MainCtrl', [
'$scope','$http',
function($scope, $http) {
  $scope.contracts = [];
  $scope.contactMethods = ['Call', 'Text', 'Email'];
  $scope.selectedContactMethod = [];

  $scope.amenities = ['W/D In Unit', 'W/D On Site', 'W/D Hookups', 'Microwave', 'Dishwasher', 'Covered Parking', 'Pool', 'Hot tub', 'Gym'];
  $scope.selectedAmenities = [];


  $scope.toggleContact = function toggleContact(methodName){
  	console.log(methodName);
  	var idx = $scope.selectedContactMethod.indexOf(methodName);
  	// Is currently selected
    if (idx > -1) {
      $scope.selectedContactMethod.splice(idx, 1);
    }

    // Is newly selected
    else {
      $scope.selectedContactMethod.push(methodName);
    }

  }

   $scope.toggleAmenities = function toggleAmenities(amenity){
  	console.log(amenity);
  	var idx = $scope.selectedAmenities.indexOf(amenity);
  	// Is currently selected
    if (idx > -1) {
      $scope.selectedAmenities.splice(idx, 1);
    }

    // Is newly selected
    else {
      $scope.selectedAmenities.push(amenity);
    }

  }

    //   $scope.dovote = function() {
    //   console.log("In Dovote");
    //   angular.forEach($scope.candidates, function(value,key) {
    //     if(value.selected) {
    //       $scope.upvote(value);
    //       $scope.ballot.push(value);
    //     }
    //   });
    // }

  $scope.create = function(contract) {
  	console.log(contract);
    return $http.post('/sellcontract', contract).success(function(data){
        $scope.contracts.push(data);
    });
  };

  $scope.save = function() {
    var uid = firebase.auth().currentUser.uid;
    $scope.writeNewContract(uid);

 }

   $scope.writeNewContract = function(userId) {
    console.log("in writeNewContract");
    console.log(userId);
    var contractData = {
      userId: userId,
      sellername: $scope.sellername,
      selleremail: $scope.selleremail,
      sellertel: $scope.sellertel,
      sellerpref: $scope.selectedContactMethod,
      amenities: $scope.selectedAmenities,
      date: $scope.date,
      address: $scope.address,
      city: $scope.city,
      zip: $scope.zip,
      rent: $scope.rent,
      deposit: $scope.deposit,
      description: $scope.description
    }
    console.log(contractData);
	// Get a key for a new Post.
  var newContractKey = firebase.database().ref().child('contracts').push().key;

  // Write the new post's data simultaneously in the contracts list and the user's post list.
  var updates = {};
  updates['/contracts/' + newContractKey] = contractData;
  updates['/user-contracts/' + userId + '/' + newContractKey] = contractData;

  return firebase.database().ref().update(updates);



  }

}
]);


var commentsRef = firebase.database().ref('contracts/');
commentsRef.on('child_added', function(data) {
  console.log("child added!");
});

commentsRef.on('child_changed', function(data) {
  console.log("child changed!");
});

commentsRef.on('child_removed', function(data) {
  console.log("child removed!");
});




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

  $scope.addContractElement = function(data) {
    console.log("in add contract element");
    console.log(data);
    $scope.contracts.push(data);
  }


  $scope.create = function(contract) {
  	console.log(contract);
    return $http.post('/sellcontract', contract).success(function(data){
        // $scope.contracts.push(data);
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


  var contractsRef = firebase.database().ref('contracts/');
  contractsRef.on('child_added', function(data) {
      console.log("child added!");
      $scope.addContractElement(data.val());
          $scope.$apply();
   });

  contractsRef.on('child_changed', function(data) {
    console.log("child added!");
    // setCommentValues(postElement, 
    //   data.key, 
    //   data.val().text, 
    //   data.val().author);
  });

  contractsRef.on('child_removed', function(data) {
    console.log("child added!");
    // deleteComment(postElement, data.key);
  });

// contractsRef.once('value', function(snapshot) {
//   snapshot.forEach(function(childSnapshot) {
//     var childKey = childSnapshot.key;
//     var childData = childSnapshot.val();
//     $scope.addContractElement(childData)
//   });
// });

}
]);






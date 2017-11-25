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
      date: $scope.date,
      address: $scope.address,
      city: $scope.city,
      zip: $scope.zip,
      rent: $scope.rent,
      deposit: $scope.deposit,
      description: $scope.description
    }
    console.log(contractData);

    var newContractKey = firebase.database().ref().child('contracts').push().key;
    console.log(newContractKey);

    var updates = {};
    updates['/dibs-byu-housing/contracts/'+newContractKey] = contractData;
    //updates['/dibs-byu-user-contracts/'+userId+'/'+newContractKey] = contractData;


    try {
      return firebase.database().ref().child('contracts').push(contractData);
    } catch (error) {
      console.log(error);
    }



  }

}
]);




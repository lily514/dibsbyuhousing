var app = angular.module('contract', ["firebase", "ngCookies"]);

// app.factory('//ContractService', //ContractService);

// function //ContractService (){
// 	var savedData = {};
// 	function set(data){
// 		savedData = data; 
// 	}
// 	function get() {
// 		return savedData;
// 	}

// 	return {
// 		set: set,
// 		get: get,

// 	}
// }

app.controller('ContractCtrl', [
	'$scope', '$http', '$cookies',
	function($scope, $http, $cookies,){
		var c = JSON.parse($cookies.get('contract'));
		$scope.contracts = [];
    $scope.contracts.push(c);
    console.log($scope.contracts);

}]);

app.controller('MainCtrl', [
'$scope','$http', '$firebaseArray', '$cookies',
function($scope, $http, $firebaseArray, $cookies) {

  $scope.newContractKey = "";

  $scope.contracts = [];

  $scope.files = [];

  $scope.userId = "";


  $scope.datelong=new Date();//

  $scope.contactMethods = ['Call', 'Text', 'Email'];
  $scope.selectedContactMethod = [];

  $scope.amenities = ['W/D In Unit', 'W/D On Site', 'W/D Hookups', 'Microwave', 'Dishwasher', 'Covered Parking', 'Pool', 'Hot tub', 'Gym', 
  'Dogs Allowed', 'Cats Allowed', 'Utilities Included', 'Furnished', 'Private Room'];
  //$scope.selectedAmenities = [];

  $scope.categories = ["Family", "Women", "Men"];
  //$scope.selectedCategory = "";

  $scope.bedrooms = ["Studio", "1", "2", "3+"]; //shared or private?
  //$scope.selectedBed = "";  

  $scope.pictures = [];

  $scope.filter = [];

  $scope.matching = [];
  $scope.missing = [];

  $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

  $scope.toggleCategory = function toggleCategory(cat){
    console.log(cat);
    var x = document.getElementsByClassName("category-radio");
    Array.from(x).forEach(function (el) {
      el.parentElement.classList.remove("active");
      if (el.value == cat) {
        // Is currently selected
        if ($scope.selectedCategory == cat) {
          $scope.selectedCategory = "";
        }
        // Is newly selected
        else {
          $scope.selectedCategory = cat;
          el.parentElement.classList.add("active");
        }
      }
    });
  }

  $scope.toggleCategoryPref = function toggleCategory(cat){
    console.log("in toggle category pref");  
    $scope.selectedCategory = cat;
    $scope.Filter();
  }

  $scope.toggleBedPref = function toggleBed(bed){
    console.log("in toggle bed pref");  
    $scope.selectedBed = bed;
    $scope.Filter();
  }

  $scope.toggleAmenityPref = function(a){
    console.log("in toggle amenity pref");
    $scope.selectedAmenities.push(a);
    $scope.Filter();
    console.log(a);  
  }

    $scope.toggleBed = function toggleBed(bed){
    console.log(bed);
    var x = document.getElementsByClassName("bed-radio");
    Array.from(x).forEach(function (el) {
      el.parentElement.classList.remove("active");
      if (el.value == bed) {
        // Is currently selected
        if ($scope.selectedBed == bed) {
          $scope.selectedBed = "";
        }
        // Is newly selected
        else {
          $scope.selectedBed = bed;
          el.parentElement.classList.add("active");
        }
      }
    });
  }

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

 $scope.validate = function() {
 	var valid = true;

	if ($('#name').val() == ""){
		document.getElementById("NameRow").classList.add("has-danger");
 		valid = false;
	} else {
		document.getElementById("NameRow").classList.remove("has-danger");
	}

	if ($('#email').val() == ""){
		document.getElementById("EmailRow").classList.add("has-danger");
 		valid = false;
	} else {
		document.getElementById("EmailRow").classList.remove("has-danger");
	}
	if ($('#phone').val() == ""){
		document.getElementById("PhoneRow").classList.add("has-danger");
 		valid = false;
	} else {
		document.getElementById("PhoneRow").classList.remove("has-danger");
	}

	if (!$scope.address){
		document.getElementById("AddressRow").classList.add("has-danger");
 		valid = false;
	} else {
		document.getElementById("AddressRow").classList.remove("has-danger");
	}

	if (!$scope.city){
		document.getElementById("CityRow").classList.add("has-danger");
 		valid = false;
	} else {
		document.getElementById("CityRow").classList.remove("has-danger");
	}

	if (!$scope.zip){
		document.getElementById("ZipRow").classList.add("has-danger");
 		valid = false;
	} else {
		document.getElementById("ZipRow").classList.remove("has-danger");
	}

	if (!$scope.rent){
		document.getElementById("RentRow").classList.add("has-danger");
 		valid = false;
	} else {
		document.getElementById("RentRow").classList.remove("has-danger");
	}

	if (!$scope.deposit){
		document.getElementById("DepositRow").classList.add("has-danger");
 		valid = false;
	} else {
		document.getElementById("DepositRow").classList.remove("has-danger");
	}

	if (!$scope.description){
		document.getElementById("DescriptionRow").classList.add("has-danger");
 		valid = false;
	} else {
		document.getElementById("DescriptionRow").classList.remove("has-danger");
	}

 	if($scope.selectedBed == []){
 		document.getElementById("BedroomRow").classList.add("has-danger");
 		valid = false;
 	} else {
 		document.getElementById("BedroomRow").classList.remove("has-danger");
 	}

 	if($scope.selectedCategory == []){
 		document.getElementById("ContractTypeRow").classList.add("has-danger");
 		valid = false;
 	} else {
 		document.getElementById("ContractTypeRow").classList.remove("has-danger");
 	}

 	return valid;

 }

 $scope.goTo = function(contract){
 	console.log(contract);
 	//ContractService.set(contract);
 	$cookies.putObject('contract', contract);
 	window.open("/contract", "_self", false);
 }

 $scope.myFilter = function (item) { 
    return item.key == $scope.key; 
};

  $scope.Filter = function(){
    $scope.filter = {
      amenities: $scope.selectedAmenities,
      category: $scope.selectedCategory,
      bedrooms: $scope.selectedBed
    }
    console.log($scope.filter);
    $scope.matching.length = 0;
    $scope.missing.length = 0;
    Array.from($scope.contracts).forEach(function(contract) {
      console.log(contract);
        if (contract.category == $scope.filter.category){
          if ($scope.filter.bedrooms == ""){
            $scope.matching.push(contract);
          }
          else {
            if( contract.bedrooms == $scope.filter.bedrooms){

                if ($scope.filter.amenities && $scope.filter.amenities.length != 0){
                  var found = false;
                  var almost = jQuery.extend(true, {}, contract);
                  var missing_a = [];
                  for(var i = 0; i < $scope.filter.amenities.length; i++) {
                      if ($scope.filter.amenities[i] in contract.amenities) {
                          found = true;
                          break;
                      }
                      else {
                        missing_a.push($scope.filter.amenities[i]);
                      }
                  }
                  if (missing_a.length != 0){
                    almost.missing = missing_a;
                    $scope.missing.push(almost); 
                  }
                  else{
                    $scope.matching.push(contract); 
                  }
                } else {
                  $scope.matching.push(contract);  
                }
                


            }
            else {
              var almost = jQuery.extend(true, {}, contract);
              almost.missing = "Bedrooms do not match";
              $scope.missing.push(almost);
            }
          }
        }
    });
    console.log($scope.matching);
  }



  $scope.setFilter = function(){
    console.log("in set filter");
    $scope.Filter();
    $scope.$apply();
 }


  $scope.clearFilter = function(){
    $scope.matching = $scope.contracts.slice();
    console.log("in clear Filter");
    console.log($scope.matching);
    $scope.$apply();
 }

   $scope.writeNewContract = function(userId) {
    console.log("in writeNewContract");
    console.log($scope.selectedCategory);
    console.log(userId);
    $scope.userId = userId;
    var d=$scope.datelong;
    var year=d.getFullYear();
    var m=d.getMonth();
    var month = $scope.months[m];
    var day=d.getDate();
    var date = month+ " " + day + ", " + year;
    console.log(date);

    $scope.newContractKey = firebase.database().ref().child('contracts').push().key; 

    var contractData = {
      userId: userId,
      sellername: $('#name').val(),
      selleremail: $('#email').val(),
      sellertel: $('#phone').val(),
      amenities: $scope.selectedAmenities,
      category: $scope.selectedCategory,
      bedrooms: $scope.selectedBed,
      date: date,
      datelong: $scope.datelong,
      address: $scope.address,
      city: $scope.city,
      zip: $scope.zip,
      rent: $scope.rent,
      deposit: $scope.deposit,
      images: $scope.pictures,
      description: $scope.description,
      key: $scope.newContractKey
    }
    console.log(contractData);
	// Get a key for a new Post.
   
  
  // Write the new post's data simultaneously in the contracts list and the user's post list.
  var updates = {};
  updates['/contracts/' + $scope.newContractKey] = contractData;
  updates['/user-contracts/' + userId + '/' + $scope.newContractKey] = contractData;

  firebase.database().ref().update(updates);
  }

  $scope.startUpload = function() {
    $scope.files = document.getElementById('js-upload-files').files;
    var valuern = 0;
      Array.from($scope.files).forEach(function(file) {
      console.log(file.name);
      // Create a reference to 'mountains.jpg'
      //var photoref = storageRef.child($scope.newContractKey+"/"+ file.name);
      var photoref = storageRef.child(file.name);
      // console.log(photoref);
      // return photoref.put(file).then(function(snapshot) {
      //   console.log('Uploaded file!');
      // });
      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      };
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress > valuern){
            valuern = progress;
            $('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);
          }
          
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

            //todo other errors

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadTask.snapshot.downloadURL;
        $scope.pictures.push({name:file.name, url:downloadURL});
        console.log($scope.pictures);
      });
    });  
  };

  $scope.addContractElement = function(data) {
    console.log("in add contract element");
    console.log(data);
    $scope.contracts.push(data);
  }

  $scope.addMyContractElement = function(uid) {
    $scope.userId = uid;
    $scope.myContracts = $firebaseArray(firebase.database().ref('user-contracts/'+$scope.userId));
  }

  $scope.setUserId = function(uid){
    $scope.userId = uid;
  }

  $scope.addFavorite = function(contract) {
  	console.log("in favorite");
  	$scope.myFavorites = $firebaseArray(firebase.database().ref('user-favorites/'+$scope.userId));
  	$scope.myFavorites.$add(contract.key);

  }

  $scope.deleteMyContract = function(contract) {
  	console.log("todo: delete contract");
  	console.log(contract);
  	firebase.database().ref().child('contracts/'+contract.key).remove();
  	$scope.myContracts.$remove(contract);
  }

  var contractsRef = firebase.database().ref('contracts/');
  contractsRef.on('child_added', function(data) {
      console.log("child added!");
      $scope.addContractElement(data.val());
      $scope.$apply();
   });

  // contractsRef.on('child_changed', function(data) {
  //   console.log("child added!");
  //   // setCommentValues(postElement, 
  //   //   data.key, 
  //   //   data.val().text, 
  //   //   data.val().author);
  // });

  // contractsRef.on('child_removed', function(data) {
  //   console.log("child added!");
  //   // deleteComment(postElement, data.key);
  // });

  // var userContractsRef = firebase.database().ref('user-contracts/');
  // userContractsRef.on('child_added', function(data) {
  //     console.log("child added!");

  //     $scope.addMyContractElement(data.val());
  //     $scope.$apply();
  //  });

}
]);



  ondrop = function(e) {
          document.getElementById('drop-zone').className = 'upload-drop-zone';
          $scope.files = e.dataTransfer.files;
      }

  ondragover = function() {
          document.getElementById('drop-zone').className = 'upload-drop-zone drop';
          $scope.$apply();
      }

  ondragleave = function() {
          document.getElementById('drop-zone').className = 'upload-drop-zone';
          $scope.$apply();
      }


  function save(){
  	if (angular.element(document.getElementById('sell-form')).scope().validate() == true)
  	{
	    angular.element(document.getElementById('sell-form')).scope().save();
	    window.open ('/','_self',false);
	}
  }

  function addMyContracts(uid){
  	if (document.getElementById('myContracts')){
  		angular.element(document.getElementById('myContracts')).scope().addMyContractElement(uid);
  	}
  }

  function setUID(uid){
    if (document.getElementById('results')){
      angular.element(document.getElementById('results')).scope().setUserId(uid);
    }
  }

 



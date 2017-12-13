angular.module('contract', ["firebase"])
.controller('MainCtrl', [
'$scope','$http', '$firebaseArray',
function($scope, $http, $firebaseArray) {
  $scope.newContractKey = "";

  $scope.contracts = [];

  $scope.files = [];

  $scope.userId = "";


  $scope.datelong=new Date();//

  $scope.contactMethods = ['Call', 'Text', 'Email'];
  $scope.selectedContactMethod = [];

  $scope.amenities = ['W/D In Unit', 'W/D On Site', 'W/D Hookups', 'Microwave', 'Dishwasher', 'Covered Parking', 'Pool', 'Hot tub', 'Gym', 
  'Dogs Allowed', 'Cats Allowed', 'Utilities Included', 'Furnished', 'Shared Bedroom', 'Private Bedroom'];
  $scope.selectedAmenities = [];

  $scope.categories = ["Family", "Women", "Men"];
  $scope.selectedCategory = "";

  $scope.bedrooms = ["Studio", "1", "2", "3+"]; //shared or private?
  $scope.selectedBed = "";  

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

  $scope.toggleAmenityPref = function toggleAmenity(a){
    console.log("in toggle amenity pref");
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
              
                // if ($scope.filter.amenities.length != 0){
                //   var found = false;
                //   var almost = jQuery.extend(true, {}, contract);
                //   var missing_a = [];
                //   for(var i = 0; i < $scope.filter.amenities.length; i++) {
                //       if ($scope.filter.amenities[i] in contract.amenities) {
                //           found = true;
                //           break;
                //       }
                //       else {
                //         missing_a.push($scope.filter.amenities[i]);
                //       }
                //   }
                //   if (missing_a.length != 0){
                //     almost.missing = missing_a;
                //     $scope.matching.push(almost); 
                //   }
                //   else{
                //     $scope.matching.push(contract); 
                //   }
                // }
                $scope.matching.push(contract);


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

    //validation??

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
      description: $scope.description
    }
    console.log(contractData);
	// Get a key for a new Post.
  $scope.newContractKey = firebase.database().ref().child('contracts').push().key;  
  
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
    console.log($scope.userId)
    $scope.myContracts = $firebaseArray(firebase.database().ref('user-contracts/'+$scope.userId));
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
    angular.element(document.getElementById('sell-form')).scope().save()
    window.open ('/','_self',false);
  }

  function addMyContracts(uid){
    angular.element(document.getElementById('myContracts')).scope().addMyContractElement(uid);
  }


/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * FirebaseUI initialization to be used in a Single Page application context.
 */

/**
 * @return {!Object} The FirebaseUI config.
 */
function getUiConfig() {
  var uiConfig = {
        signInSuccessUrl: '/signin',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: ''
      };

  return uiConfig;
}

// Initialize the FirebaseUI Widget using Firebase.
      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // Disable auto-sign in.
      ui.disableAutoSignIn();


/**
 * @return {string} The URL of the FirebaseUI standalone widget.
 */
function getWidgetUrl() {
  return '/widget#recaptcha=' + getRecaptchaMode();
}


/**
 * Redirects to the FirebaseUI widget.
 */
var signInWithRedirect = function() {
  window.location.assign(getWidgetUrl());
};


/**
 * Open a popup with the FirebaseUI widget.
 */
var signInWithPopup = function() {
  window.open(getWidgetUrl(), 'Sign In', 'width=985,height=735');
};


/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function(user) {
  if (document.getElementById('user-signed-in')){
    document.getElementById('user-signed-in').style.display = 'block';
    document.getElementById('user-signed-out').style.display = 'none';
  }
  navSignedInUser(user);

  
  // if (user.photoURL){
  //   document.getElementById('photo').src = user.photoURL;
  //   document.getElementById('photo').style.display = 'block';
  // } else {
  //   document.getElementById('photo').style.display = 'none';
  // }
};

var navSignedInUser = function (user) {
  document.getElementById('nav-user-signed-in').style.display = 'block';
  document.getElementById('nav-user-signed-out').style.display = 'none';
  document.getElementById('nav-sell-contract').setAttribute('href', "/sellcontract");
  if(document.getElementById('sell-form')){
    document.getElementById('name').value = user.displayName;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phoneNumber;
  } 
  if(document.getElementById("sign-in-main")) {
    document.getElementById('name').textContent = user.displayName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('phone').textContent = user.phoneNumber;
  }
}


/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function() {
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('user-signed-out').style.display = 'block';
  navSignedOutUser();
  ui.start('#firebaseui-container', getUiConfig());
};


var navSignedOutUser = function() {
  document.getElementById('nav-user-signed-in').style.display = 'none';
  document.getElementById('nav-user-signed-out').style.display = 'block'; 
  document.getElementById('nav-sell-contract').setAttribute('href', "/signin"); 
}
// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
  if (document.getElementById('loading')){
    document.getElementById('loading').style.display = 'none';
    document.getElementById('loaded').style.display = 'block';
    if (user) {
      handleSignedInUser(user);
    } else {
      handleSignedOutUser();
    }  
  } else {
    if (user) {
      navSignedInUser(user);
    } else {
      navSignedOutUser();
    }  
   }

});

/**
 * Deletes the user's account.
 */
var deleteAccount = function() {
  firebase.auth().currentUser.delete().catch(function(error) {
    if (error.code == 'auth/requires-recent-login') {
      // The user's credential is too old. She needs to sign in again.
      firebase.auth().signOut().then(function() {
        // The timeout allows the message to be displayed after the UI has
        // changed to the signed out state.
        setTimeout(function() {
          alert('Please sign in again to delete your account.');
        }, 1);
      });
    }
  });
};


/**
 * Initializes the app.
 */
var initApp = function() {
  if (document.getElementById('sign-out')) {
    document.getElementById('sign-out').addEventListener('click', function() {
      firebase.auth().signOut();
    });
    document.getElementById('delete-account').addEventListener(
        'click', function() {
          deleteAccount();
        });    
  }
  else {
    var user = firebase.auth().currentUser
    if (user) {
      navSignedInUser(user);
    } else {
      navSignedOutUser();
    }
  }

};

window.addEventListener('load', initApp);

// $( document ).ready(function() {
//     'use strict';
//     console.log("document ready");
//     var user = firebase.auth().currentUser;
//     console.log(document.getElementById('nav-user-signed-in'));

//     if (user) {
//       // User is signed in.
//         document.getElementById('nav-user-signed-in').style.display = 'none';
//         document.getElementById('nav-user-signed-out').style.display = 'block';
//     } else {
//       // No user is signed in.
//       document.getElementById('nav-user-signed-in').style.display = 'block';
//   document.getElementById('nav-user-signed-out').style.display = 'none';
//     }
// });
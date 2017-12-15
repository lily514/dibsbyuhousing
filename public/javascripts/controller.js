var currentTab;
var x;
$( document ).ready(function() {
	currentTab = 0; // Current tab is set to be the first tab (0)
	x = document.getElementsByClassName("tab");
	showTab(currentTab); // Display the current tab
	$("body").css({"background-image": "url('https://images.pexels.com/photos/257344/pexels-photo-257344.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb')",
 	  "background-position": "100% -60px",
 	  "background-size": "cover"});

});

function showTab(n) {
	// This function will display the specified tab of the form ...
	// var x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	// ... and fix the Previous/Next buttons:
	if (n == 0) {
		document.getElementById("prevBtn").style.display = "none";
	} else {
		document.getElementById("prevBtn").style.display = "inline";
	}
	if (n == (x.length - 1)) {
		document.getElementById("nextBtn").innerHTML = "Submit";
	} else {
		document.getElementById("nextBtn").innerHTML = "Next";
	}
	// ... and run a function that displays the correct step indicator:
	fixStepIndicator(n)
}

function nextPrev(n) {
	console.log("in nextPrev: "+n);
	// This function will figure out which tab to display
	var x = document.getElementsByClassName("tab");
	// Hide the current tab:
	x[currentTab].style.display = "none";
	// Increase or decrease the current tab by 1:
	currentTab = currentTab + n;
	// if you have reached the end of the form... :
	if (currentTab >= x.length) {
		//...the form gets submitted:
		// document.getElementById("search-form").submit();
		submit();
		return;
	}
	// Otherwise, display the correct tab:
	showTab(currentTab);
}
	function fixStepIndicator(n) {
	// This function removes the "active" class of all steps...
	var i, x = document.getElementsByClassName("step");
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(" active", "");
	}
	//... and adds the "active" class to the current step:
	x[n].className += " active";

}


	function submit() {
		angular.element(document.getElementById('search-form')).scope().setFilter();
		document.getElementById("filter").style.display = "none";
		document.getElementById("results").style.display = "block";
		$("body").css({"background-image":"none"});

	
	}

	function browseall(){
		var scope = angular.element(document.getElementById('search-form')).scope();
		scope.clearFilter();
		scope.$apply();
 		  document.getElementById("filter").style.display = "none";
		  document.getElementById("results").style.display = "block";
		  $("body").css({"background-image":"none"});

		    // if(firebase.auth().currentUser){
		    //     $('.hiddenButton').each(function(){
		    //       $(this).attr('disabled', false);
		    //     });
		    // }
		    // else {
		    //     $('.hiddenButton').each(function(){
		    //       $(this).attr('disabled', true);
		    //     });
		    // }

	}


$('#navbrowse').click( function(e) {
    	  e.preventDefault();
    	  browseall();
  		  return false; 
} );

$('#quizbrowse').click( function(e) {
    	  e.preventDefault();
    	  browseall();
  		  return false; 
} );

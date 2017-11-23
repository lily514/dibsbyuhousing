$( document ).ready(function() {
    'use strict';
    console.log("document ready");
    var dropZone = document.getElementById('drop-zone')
});

var submitUpload = function(e){
	var uploadFiles = document.getElementById('js-upload-files').files;
    e.preventDefault()

    startUpload(uploadFiles)
};

var startUpload = function(files) {
    console.log(files)
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

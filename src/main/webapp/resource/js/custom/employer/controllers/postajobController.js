app.controller('postaJobController', function($scope, $location, $rootScope, fileUpload) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else {
		$(".postajob").addClass("active");
		$(".posted_jobs").removeClass("active");
		$(".employer_dashboard").removeClass("active");
		$(".boolean_search").removeClass("active");
		$(".my_favorites").removeClass("active");
		$(".saved_search").removeClass("active");

		$rootScope.userobj = accessData;
		$rootScope.returnData = returnData;
		$("#employeeheader").hide();
		$("#signoutheader").show();
		$("#homeheader").hide();
		$("#employerheader").show();
		$("#signinheader").hide();
		$("#footersection").hide();
		$(".hideclass").hide();
	}

	$scope.uploadJobDesFile = function(){
     var file = $scope.jobDesFile;

     console.log('file is ' );
     console.dir(file);

		 if (file == '' || file == undefined) {
		 	alert("Please select a File");
		}else {
			var uploadUrl = "http://183.82.1.143:9060/jobs";
 		 	var successMsg = 'Job Details Posted Successfully';
			fileUpload.uploadFileToUrl(file, uploadUrl, successMsg);
		}
  };

	$scope.postJob = {};
	$scope.postJob.title = "";
	$scope.postJob.description = "";
	$scope.postJob.companyName = "";
	$scope.postJob.email = "";
	$scope.postJob.keyword = "";
	$scope.postJob.skills = "";
	$scope.postJob.jobRequirements = "";
	$scope.postJob.numberOfVacanies = "";
	$scope.postJob.industryType = "";
	$scope.postJob.functionalArea = "";
	$scope.postJob.country = "";
	$scope.postJob.city = "";
	$scope.postJob.share = "";

	var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

		// var uploadUrl = "http://183.82.1.143:9060/jobs";
		// var successMsg = 'Job Details Posted Successfully';
		// fileUpload.uploadFileToUrl(textFile, uploadUrl, successMsg);

    return textFile;
  };



	$scope.postJobFn = function() {
		console.log($scope.postJob);
		if ($scope.postJob.title && $scope.postJob.description && $scope.postJob.companyName && $scope.postJob.email &&
				$scope.postJob.keyword && $scope.postJob.skills && $scope.postJob.jobRequirements && $scope.postJob.numberOfVacanies &&
				$scope.postJob.industryType && $scope.postJob.functionalArea && $scope.postJob.country && $scope.postJob.city ) {

			makeTextFile($scope.postJob);
			var fileNameUp = returnData.firstName + new Date().getTime() + '.txt';
			console.log(fileNameUp);
			// var home = System.getProperty("user.home");
			var anchor = angular.element('<a/>');
			// anchor.attr({
			// 	href: 'data:attachment/csv;charset=utf-8,' + encodeURI($scope.postJob.title),
      //   target: '_blank',
      //   download: fileNameUp
     // 	})[0].click();
			// var uploadUrl = "http://183.82.1.143:9060/jobs";
			// var successMsg = 'Job Details Posted Successfully';
			// fileUpload.uploadFileToUrl("C:/Users/Pradeep/Downloads/" + fileNameUp, uploadUrl, successMsg);

			var formData = new FormData();
			var blob = new Blob([$scope.postJob.title], {type: 'plain/text'});
			formData.append('file', blob, "readme.txt");

			var xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://183.82.1.143:9060/jobs", true);
	    xhr.setRequestHeader("Content-type", "multipart/form-data; boundary=----WebKitFormBoundarykTbyItDjjYH5NAZB");
	    xhr.onreadystatechange = function ()
	    {
	        if (xhr.readyState == 4 && xhr.status == 200)
	            alert("File uploaded!");
	    }
	    xhr.send(formData);
		}else {
			alert('Please enter All Fields');
		}
	}

});

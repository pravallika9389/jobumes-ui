app.controller('employeeDashboardController', function($scope, $location, $rootScope, $http, fileUpload) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		$(".emp_dashboard").addClass("active");
		$(".graphical_resume").removeClass("active");
    $(".myjobs").removeClass("active");
    $(".graphsume").removeClass("active");
    $(".detailed_resume").removeClass("active");
    $(".my_documents").removeClass("active");

		$rootScope.userobj = accessData;
		$rootScope.returnData = returnData;
		$("#employeeheader").show();
		$("#signoutheader").show();
		$("#homeheader").hide();
		$("#employerheader").hide();
		$("#signinheader").hide();
		$("#footersection").hide();
		$(".hideclass").hide();
	}

	$scope.data = {
	  "url": "http://183.82.1.143:9058/jobumes/resumes/Arun.docx",
	  "name" : "Aru CV 1"
	}

	$scope.uploadFileLink = function(){
		var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);
		if($scope.resumeLink){
			var res = $http({
				method: 'POST',
				url: 'http://183.82.1.143:9060/resumes',
				headers: {
					'Authorization': valuesToBasic,
					'Content-Type' : 'multipart/form-data request'
				}
				// ,
				// data: $scope.data
			});

			res.success(function(data, status, headers, config) {
				console.log(data);
				if (status >= 200 || status < 300) {
					alert("File Uploaded Successfully");
				}else {
					alert("Please check the File link");
				}
			})
			res.error(function(data, status, headers, config) {
					console.log(data);
					alert("Server Error!");
			});
		}else {
			alert("Please give a URL of a file");
		}
	}

	$scope.uploadFile = function(){
     var file = $scope.myFile;

     console.log('file is ' );
     console.dir(file);

		 if (file == '' || file == undefined) {
		 	alert("Please select a File");
		}else {
			var uploadUrl = "http://183.82.1.143:9060/resumes";
 		 	var successMsg = 'Resume Uploaded Successfully';
      fileUpload.uploadFileToUrl(file, uploadUrl, successMsg);
		}
  };
});

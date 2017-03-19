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

     var uploadUrl = "/resumes";
     fileUpload.uploadFileToUrl(file, uploadUrl);
  };
});

app.directive('fileModel', ['$parse', function ($parse) {
	return {
		 restrict: 'A',
		 link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function(){
					 scope.$apply(function(){
							modelSetter(scope, element[0].files[0]);
					 });
				});
		 }
	};
}]);

app.service('fileUpload', ['$http', function ($http) {

 var accessData = angular.fromJson(window.localStorage['userObj']);

	this.uploadFileToUrl = function(file, uploadUrl){
		uploadUrl = 'http://183.82.1.143:9060/resumes';
		 var fd = new FormData();
		 fd.append('file', file);
		//  user details
		 var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

		 $http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {
					'Authorization': valuesToBasic,
					'Content-Type' : undefined
				}
		 })

		 .success(function(){
			 alert("File Uploaded Successfully");
		 })

		 .error(function(){
			 alert("Error Occured");
		 });
	}
}]);

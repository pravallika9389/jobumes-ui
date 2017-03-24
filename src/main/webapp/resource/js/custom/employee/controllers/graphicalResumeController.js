app.controller('graphicalResumeController',['$scope', '$location', '$rootScope', '$http',
			function($scope, $location, $rootScope, $http) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		$(".graphical_resume").addClass("active");
		$(".graphsume").removeClass("active");
		$(".emp_dashboard").removeClass("active");
		$(".myjobs").removeClass("active");
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

		$scope.getResumeDetails = function() {

				var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

				var res = $http({
					method: 'GET',
					url: 'http://183.82.1.143:9060/resumes',
					headers: {'Authorization': valuesToBasic},
				});

				res.success(function(data, status, headers, config) {
					console.log(data);
					if(status >= 200 || status <300){
						// data.resumes.forEach(function(element){
						// 	coverLetterArr.push(element.details.ResumeParserData.Coverletter);
						// 	profileDetails.push(element);
						// })
						// $scope.coverLetterArr = coverLetterArr;
						// $scope.profileDetails = profileDetails;
						$scope.defaultResume = data.resumes[0];
						console.log(data.resumes[0]);
					}else {
						alert('Server Error');
					}

				});
				res.error(function(data, status, headers, config) {
						console.log(data);
						alert("Server Error");
				});
		}

		$scope.getResumeDetails();
	}

	$scope.gotoEditResume = function(items){
		$rootScope.resumeDetailsToEdit = items;
		$location.path('/edit_profile');
	}

}]);

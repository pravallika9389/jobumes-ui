app.controller('postedJobsController', function($scope, $location, $rootScope, $http) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else {
		$(".posted_jobs").addClass("active");
		$(".employer_dashboard").removeClass("active");
		$(".postajob").removeClass("active");
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

		var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

		// to get all posted jobs
		var res = $http({
			method: 'GET',
			url: 'http://183.82.1.143:9060/jobs',
			headers: {'Authorization': valuesToBasic}
		});
		res.success(function(data, status, headers, config) {
			if((status >= 200 || status < 300)){
				console.log(data);
				$rootScope.getJobsByPostedUser = [];
				data.forEach(function(element) {
					if (element.parsedJson.JobData.JobProfile[0] != '') {
						console.log(element.parsedJson.JobData.JobProfile[0]);
						$rootScope.getJobsByPostedUser.push(element.parsedJson.JobData);
					}

				})
				console.log($rootScope.getJobsByPostedUser);
			}
			else{
				alert("Error in retrieving Jobs");
			}

		});
		res.error(function(data, status, headers, config) {
				console.log(data);
				alert("Server error in retrieving Jobs");
		});
	}
});

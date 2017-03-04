app.controller('myJobsController', function($scope, $location, $rootScope, $http) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		$(".myjobs").addClass("active");
		$(".graphical_resume").removeClass("active");
		$(".emp_dashboard").removeClass("active");
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

	$scope.feedback = {};
	$scope.feedback.thinkingtocommentfor = "";
	$scope.feedback.relationship = "";
	$scope.feedback.name = "";
	$scope.feedback.emailid = "";
	$scope.feedback.subject = "";
	$scope.feedback.comment = "";

	$scope.postFeedBack = function() {

		if ($scope.feedback.thinkingtocommentfor && $scope.feedback.relationship && $scope.feedback.name &&
				$scope.feedback.emailid && $scope.feedback.subject && $scope.feedback.comment) {
			var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);
			var body = {
				"thinkingtocommentfor" : $scope.feedback.thinkingtocommentfor,
				"relationship" : $scope.feedback.relationship,
				"name" : $scope.feedback.name,
				"emailid" : $scope.feedback.emailid,
				"subject" : $scope.feedback.subject,
				"comment" : $scope.feedback.comment
			};

			var res = $http({
				method: 'POST',
				url: 'http://183.82.1.143:9060/feedbacks',
				headers: {'Authorization': valuesToBasic},
				data: $scope.feedback
			});

			res.success(function(data, status, headers, config) {
				console.log(data);
				if(status >= 200 || status <300){
					alert("Feedback posted Succesfully");
					$scope.feedback = {};
					$scope.feedback.thinkingtocommentfor = "";
					$scope.feedback.relationship = "";
					$scope.feedback.name = "";
					$scope.feedback.emailid = "";
					$scope.feedback.subject = "";
					$scope.feedback.comment = "";
				}else {
					alert('Server Error');
				}

			});
			res.error(function(data, status, headers, config) {
					console.log(data);
					alert("Server Error");
			});
		}else {
			alert("Please enter all Fields");
		}
	}

	// hard coded array for recommended jobs
	$scope.recommendedJobs = [
		{
			"title" : "AngularJS Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "AngularJS Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 14, 2017"
		},{
			"title" : "ExtJs Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 15, 2017"
		},{
			"title" : "Springs Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 16, 2017"
		},{
			"title" : "Java Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Javascript Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 18, 2017"
		},{
			"title" : "Manual Tester",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 19, 2017"
		},{
			"title" : "Web Designer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "PHP Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 20, 2017"
		},{
			"title" : ".net Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "NodeJS Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Angular 2 Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Ionic 2 Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 16, 2017",
			"description" : "2.5+ years of experience"
		},{
			"title" : "Ionic Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Springs Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 16, 2017"
		}
	];

	// hardcoded array for Saved jobs
	$scope.savedJobs = [
		{
			"title" : "Springs Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 16, 2017"
		},{
			"title" : "Java Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "AngularJS Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "AngularJS Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 14, 2017"
		},{
			"title" : "ExtJs Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 15, 2017"
		},{
			"title" : "Angular 2 Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Ionic 2 Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 16, 2017",
			"description" : "2.5+ years of experience"
		},{
			"title" : "Ionic Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Javascript Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 18, 2017"
		}
	];

	// hardcoded array for applied Jobs
	$scope.appliedJobs = [
		{
			"title" : "Springs Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 16, 2017",
			"description" : "3+ years of experience"
		},{
			"title" : "Java Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017",
			"description" : "Urgent requirement for 4+ years of experience"
		},{
			"title" : "Angular 2 Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017",
			"description" : "3+ years of experience"
		},{
			"title" : "AngularJS Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017",
			"description" : "Urgent requirement for 1+ years of experience"
		},{
			"title" : "AngularJS Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 14, 2017",
			"description" : "2+ years of experience"
		},{
			"title" : "Ionic 2 Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 16, 2017",
			"description" : "2.5+ years of experience"
		},{
			"title" : "Ionic Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017",
			"description" : "2.5+ years of experience"
		}
	];
});

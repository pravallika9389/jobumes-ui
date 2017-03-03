app.controller('savedSearchController', function($scope, $location, $rootScope) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else {
		$(".saved_search").addClass("active");
		$(".posted_jobs").removeClass("active");
		$(".postajob").removeClass("active");
		$(".boolean_search").removeClass("active");
		$(".my_favorites").removeClass("active");
		$(".employer_dashboard").removeClass("active");

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
});

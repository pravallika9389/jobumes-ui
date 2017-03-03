app.controller('myVideoController', function($scope, $location, $rootScope) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
    $(".my_documents").addClass("active");
		$(".graphical_resume").removeClass("active");
		$(".emp_dashboard").removeClass("active");
		$(".myjobs").removeClass("active");
		$(".graphsume").removeClass("active");
		$(".detailed_resume").removeClass("active");

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
});

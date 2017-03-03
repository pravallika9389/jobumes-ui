app.controller('signinController',function($scope,$http,$location,$rootScope){

	var user = localStorage.getItem('isCheckUser');
	var role = localStorage.getItem('userRole');
	var accessData = window.localStorage['userObj'];
	if(user == "" || user == "empty" || user == undefined){
		// $location.path('/employee-home');
		$scope.empShow = "display: none";
		$("#employeeheader").hide();
		$("#signoutheader").hide();
		$("#homeheader").show();
		$("#employerheader").hide();
		$("#signinheader").show();
		$("#footersection").show();
		$(".hideclass").show();
	}else {
		// $rootScope.returnData = accessData;
		// console.log($rootScope.returnData);
		if (role == "employee") {
			$("#employeeheader").show();
			$("#signoutheader").show();
			$("#homeheader").hide();
			$("#employerheader").hide();
			$("#signinheader").hide();
			$("#footersection").hide();
			$(".hideclass").hide();
		}else if(role == "employer") {
			$("#employeeheader").hide();
			$("#signoutheader").show();
			$("#homeheader").hide();
			$("#employerheader").show();
			$("#signinheader").hide();
			$("#footersection").hide();
			$(".hideclass").hide();
		}
	}

		$scope.validatesignin=function(){
			// alert("validatesignin");
	    	  if($scope.userName && $scope.pass){
						// alert("Valid");

						var valuesToBasic = 'Basic ' + btoa($scope.userName + ':' + $scope.pass);
						// console.log(valuesToBasic);

					var userobj = {};
					userobj.userName = $scope.userName;
					userobj.pass = $scope.pass;
					// var res = $http.get('http://183.82.1.143:9060/login', userobj);
					var res = $http({
					  method: 'GET',
					  url: 'http://183.82.1.143:9060/login',
					  headers: {'Authorization': valuesToBasic}
					});

					res.success(function(data, status, headers, config) {
						console.log(data);
						$rootScope.userobj = userobj;
						$rootScope.returnData = data;
						if(status === 200){
							// if(data.data=='valid'){
							$("#employerheader").show();
			        $("#signoutheader").show();
			        $("#homeheader").hide();
			        $("#employeeheader").hide();
			        $("#signinheader").hide();
			        $("#footersection").hide();
			        $(".hideclass").hide();
			        $(".navbar-custom-menu").addClass("margin-top-115");
							$location.path('/employee-dashboard');
							// }
							// else{
							// 	$scope.userName='';
							// 	$scope.pass='';
							// 	$scope.myform.$setPristine();
							// 	alert('user name and password is invalid');
							// }
						}else {
							alert('Please check Login Credentials');
						}

					});
					res.error(function(data, status, headers, config) {
							console.log(data);
							alert("Please check Login Credentials");
					});


				}else {
					alert("Please give Login Credentials");
				}

			};

})

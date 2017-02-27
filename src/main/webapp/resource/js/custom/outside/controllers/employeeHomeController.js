app.controller('employeeHomeController', function($scope,$http,$location,$rootScope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
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
							$("#employeeheader").show();
			        $("#signoutheader").show();
			        $("#homeheader").hide();
			        $("#employerheader").hide();
			        $("#signinheader").hide();
			        $("#footersection").hide();
			        $(".hideclass").hide();
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
	});

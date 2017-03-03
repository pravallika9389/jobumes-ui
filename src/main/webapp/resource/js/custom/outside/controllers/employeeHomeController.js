app.controller('employeeHomeController', function($scope,$http,$location,$rootScope,facebookService) {
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
							window.localStorage['userObj'] = angular.toJson(userobj);
							window.localStorage['userDetailsObj'] = angular.toJson(data);
							localStorage.setItem('isCheckUser', $rootScope.returnData.uuid);
							localStorage.setItem('userRole', 'employee');
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
							alert("Server Error! <br>Please check Login Credentials");
					});


				}else {
					alert("Please enter Login Credentials");
				}

			};

			$scope.myFacebookLogin = function() {
	      FB.login(function(){
	        //to share a post with text in message: ''
	        // FB.api('/me/feed', 'post', {message: 'Hello, world!'});
	        facebookService.getMyDetails()
	          .then(function(response) {
	            console.log(response);
	            //for profile picture "http://graph.facebook.com/"+response.id+"/picture";
	            // console.log("http://graph.facebook.com/"+response.id+"/picture");
	          }
	        );
				// }, {scope: 'email, publish_actions, user_likes',
	      }, {scope: 'email, publish_actions',
	    return_scopes: true});
	    }

	    $scope.logoutFb = function(){
	      FB.logout(function(response) {
	        // user is now logged out
	      });
	    }
	});

app.controller("signupController", function signupController($scope, $http,$location,$route,$http) {

	// to get roles
	var res = $http({
		method: 'GET',
		url: 'http://183.82.1.143:9060/roles'
	});
	res.success(function(data, status, headers, config) {
		if((status >= 200 || status < 300)){
			// console.log(data);
			$scope.getRoles = data;
		}
		else{
			$scope.loginMessage =  status;
			alert("Error in retrieving Roles");
		}

	});
	res.error(function(data, status, headers, config) {
			console.log(data);
			alert("Server error in retrieving Roles");
	});

	$scope.role = "0850685a-70c6-4776-a24b-e51d4522573a";

	// register a user
	$scope.signUpUser = function() {
		if (!$scope.iAgree) {
			alert("Please accept the Terms");
		}else if($scope.userName && $scope.password && $scope.mobile && $scope.iAgree){

			var body = {
			  "username": $scope.userName,
			  "password": $scope.password,
			  "phonenumber": $scope.mobile,
			  "status":"new user",
			  "role": $scope.role
			};

			var res = $http({
				method: 'POST',
				url: 'http://183.82.1.143:9060/users',
				// headers: {'Authorization': valuesToBasic},
				data: body
			});

			res.success(function(data, status, headers, config) {
				if((status >= 200 || status < 300)){
					$scope.isRegistered = true;
					 $scope.loginMessage = '';
					 alert("Registered Succesfully");
					 // Making the fields empty
			 			$scope.userName='';
			 			$scope.password='';
			 			$scope.mobile = '';
			 			$scope.role = '';
			 			$scope.iAgree = '';
					// $location.path('/signin');
				  //  window.location.reload();
				}
				else{
					$scope.loginMessage =  status;
					alert("Error in Registering");
				}

			});
			res.error(function(data, status, headers, config) {
					console.log(data);
					if (status == 400 && data.reason == "Username already Exists..!!") {
						alert(data.reason);
					}else {
						alert("Server error <br>" + data.reason);
					}
			});

	  }
	  else{
		  $scope.loginMessage = "Please enter your User Name / Password";
		  alert("Please enter all fields");
	  }
	};

	// registration through facebook
	$scope.myFacebookRegistration = function () {
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
});

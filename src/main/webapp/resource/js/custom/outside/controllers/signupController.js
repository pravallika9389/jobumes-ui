app.controller("signupController", function signupController($scope, $http,$location,$route,$http,facebookService) {

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

		// register a user
	$scope.signUpUser = function() {
		$scope.role = "0850685a-70c6-4776-a24b-e51d4522573a";
		if (!$scope.iAgree) {
			alert("Please accept the Terms");
		}else if($scope.userName && $scope.password && $scope.mobile && $scope.iAgree){

			// var body = {
			//   "username": $scope.userName,
			//   "password": $scope.password,
			//   "phonenumber": $scope.mobile,
			//   "status":"new user",
			//   "role": $scope.role
			// };

			var body = {
			 "username": $scope.userName,
			 "role": $scope.role,
			 "password": $scope.password,
 			 "phonenumber": $scope.mobile,
			 "status":"new user"
			}

			$scope.callRegService(body);
	  }
	  else{
		  $scope.loginMessage = "Please enter your User Name / Password";
		  alert("Please enter all fields");
	  }
	};

	// registration through facebook
	$scope.myFacebookRegistration = function () {
		$scope.role = "0850685a-70c6-4776-a24b-e51d4522573a";
		FB.login(function(){
			//to share a post with text in message: ''
			// FB.api('/me/feed', 'post', {message: 'Hello, world!'});
			facebookService.getMyDetails()
				.then(function(response) {
					console.log(response);
					//for profile picture "http://graph.facebook.com/"+response.id+"/picture";
					// console.log("http://graph.facebook.com/"+response.id+"/picture");
					var body = {
					 "username": response.email,
					 "role": $scope.role,
					 "status":"new user",
					 "socialnetwork":"facebook",
					 "detailsinjson":{
					   "id": response.id,
					   "first_name": response.first_name,
					   "last_name": response.last_name,
					   "gender": response.gender,
					   "email": response.email,
					   "profilePicPath": "http://graph.facebook.com/"+response.id+"/picture"
					 }
					}
					$scope.callRegService(body);
				}
			);
		// }, {scope: 'email, publish_actions, user_likes',
		}, {scope: 'email, publish_actions',
		return_scopes: true});
	}

	// register a recruiter
$scope.signUpRecruiter = function() {
	$scope.role = "4ef9c710-fed3-4be0-afd1-178b8e4ca4eb";
	if (!$scope.iAgreeRec) {
		alert("Please accept the Terms");
	}else if($scope.userNameRec && $scope.passwordRec && $scope.mobileRec && $scope.iAgreeRec){

		var body = {
		 "username": $scope.userNameRec,
		 "role": $scope.role,
		 "password": $scope.passwordRec,
		 "phonenumber": $scope.mobileRec,
		 "status":"new user"
		}

		$scope.callRegService(body);
	}
	else{
		$scope.loginMessage = "Please enter your User Name / Password";
		alert("Please enter all fields");
	}
};

// registration through facebook
$scope.myFacebookRegistrationRec = function () {
	$scope.role = "4ef9c710-fed3-4be0-afd1-178b8e4ca4eb";
	FB.login(function(){
			//to share a post with text in message: ''
			// FB.api('/me/feed', 'post', {message: 'Hello, world!'});
			facebookService.getMyDetails()
				.then(function(response) {
					console.log(response);
					//for profile picture "http://graph.facebook.com/"+response.id+"/picture";
					// console.log("http://graph.facebook.com/"+response.id+"/picture");
					var body = {
					 "username": response.email,
					 "role": $scope.role,
					 "status":"new user",
					 "socialnetwork":"facebook",
					 "detailsinjson":{
						 "id": response.id,
						 "first_name": response.first_name,
						 "last_name": response.last_name,
						 "gender": response.gender,
						 "email": response.email,
						 "profilePicPath": "http://graph.facebook.com/"+response.id+"/picture"
					 }
					}
					$scope.callRegService(body);
				}
			);
		// }, {scope: 'email, publish_actions, user_likes',
		}, {scope: 'email, publish_actions',
		return_scopes: true});
	}

	$scope.callRegService = function(body) {
		var res = $http({
			method: 'POST',
			url: 'http://183.82.1.143:9060/signup',
			// url: 'http://183.82.1.143:9060/users',
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
					$scope.iAgree = '';

					$scope.userNameRec='';
					$scope.passwordRec='';
					$scope.mobileRec = '';
					$scope.iAgreeRec = '';
					if ($scope.role == '4ef9c710-fed3-4be0-afd1-178b8e4ca4eb') {
						$scope.role = '';
						$location.path('/employer-home');
					}else {
						$scope.role = '';
						$location.path('/employee-home');
					}
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
					alert("Server error - " + data.reason);
				}
		});
	}
});

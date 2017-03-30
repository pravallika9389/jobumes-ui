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
		// job-seeker role uuid
		$scope.role = "e7c5f5f2-d2e1-4ae6-bf66-bff67bef90b1";
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
		// job-seeker role uuid
		$scope.role = "e7c5f5f2-d2e1-4ae6-bf66-bff67bef90b1";
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
					 "socialNetwork":"facebook",
					 "details":{
						 "id": response.id,
						 "firstName": response.first_name,
						 "middleName": response.middle_name,
						 "lastName": response.last_name,
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
	// job recruiter role uuid
	$scope.role = "1a6decf9-86c7-47ae-9776-24ed7ece6462";
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
	// job recruiter role uuid
	$scope.role = "1a6decf9-86c7-47ae-9776-24ed7ece6462";
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
					 "socialNetwork":"facebook",
					 "details":{
						 "id": response.id,
						 "firstName": response.first_name,
						 "middleName": response.middle_name,
						 "lastName": response.last_name,
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

	// google plus signin
	// This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;

    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function(authResult) {
        // Do a check if authentication has been successful.
        if(authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
						console.log("sign in success");
						console.log(authResult);
						$scope.getUserInfo();
            //     ...
            // Do some work [1].
            //     ...
        } else if(authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
						console.log("sign in failed");
						console.log(authResult);
            // Report error.
        }
    };

    // When callback is received, we need to process authentication.
    $scope.signInCallback = function(authResult) {
        $scope.$apply(function() {
            $scope.processAuth(authResult);
        });
    };

    // Render the sign in button.
    $scope.renderSignInButton = function(role) {
			$scope.userRole = role;
			console.log(role);
			// gapi.client.setApiKey('AIzaSyBb7hkKtWbPIrivd925jdJWKesi4A5Ej10');
	    // gapi.client.load('plus', 'vl' , function() {});

				// for job seeker based on span id
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '1081467653510-scbqdl91cqomgv4r2q1pl8h363poc7pi.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin',
								'approvalprompt': 'force',
								'immediate': false
            }
        );

				// for recruiter based on span id
				gapi.signin.render('signInButton2',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '1081467653510-scbqdl91cqomgv4r2q1pl8h363poc7pi.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin',
								'approvalprompt': 'force',
								'immediate': false
            }
        );
    }

    // Start function in this example only renders the sign in button.
    $scope.start = function() {
        $scope.renderSignInButton();
    };

		// Process user info.
		// userInfo is a JSON object.
		$scope.processUserInfo = function(userInfo) {
			// job-seeker role uuid
			if ($scope.userRole == 'jobSeeker') {
				$scope.role = "e7c5f5f2-d2e1-4ae6-bf66-bff67bef90b1";
			}
			if ($scope.userRole == 'jobRecruiter') {
				$scope.role = "1a6decf9-86c7-47ae-9776-24ed7ece6462";
			}

			console.log(userInfo);
		    // You can check user info for domain.
		    if(userInfo['domain'] == 'mycompanydomain.com') {
		        // Hello colleague!
		    }

				var body = {
				 "username": userInfo.emails[0].value,
				 "role": $scope.role,
				 "status":"new user",
				 "socialNetwork":"googleplus",
				 "details":{
					 "id": userInfo.id,
					 "firstName": userInfo.name.givenName,
					 "middleName": "",
					 "lastName": userInfo.name.familyName,
					 "gender": userInfo.gender,
					 "email": userInfo.emails[0].value,
					 "profilePicPath": userInfo.image.url
				 }
				}
				$scope.callRegService(body);

		    // Or use his email address to send e-mails to his primary e-mail address.
		    // sendEMail(userInfo['emails'][0]['value']);
		}

		// When callback is received, process user info.
		$scope.userInfoCallback = function(userInfo) {
		    $scope.$apply(function() {
		        $scope.processUserInfo(userInfo);
		    });
		};

		// Request user info.
		$scope.getUserInfo = function() {
		    gapi.client.request(
		        {
		            'path':'/plus/v1/people/me',
		            'method':'GET',
		            'callback': $scope.userInfoCallback
		        }
		    );
		};

		// to signout
		// gapi.auth.signOut();

});

app.controller('profileSettingsController', function($scope, $location, $rootScope, $http) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		$rootScope.userobj = accessData;
		$rootScope.returnData = returnData;
		$scope.getResumeDetails = function() {

				var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

				var res = $http({
					method: 'GET',
					url: 'http://183.82.1.143:9060/resumes',
					headers: {'Authorization': valuesToBasic},
				});

				res.success(function(data, status, headers, config) {
					console.log(data);
					$scope.coverLetterArr = "";
					$scope.profileDetails = "";

					var coverLetterArr = [];
					var profileDetails = [];

					if(status >= 200 || status <300){
						data.resumes.forEach(function(element){
							coverLetterArr.push(element.details.ResumeParserData.Coverletter);
							profileDetails.push(element);
						})
						$scope.coverLetterArr = coverLetterArr;
						$scope.profileDetails = profileDetails;
						// console.log($scope.coverLetterArr);
					}else {
						alert('Server Error');
					}

				});
				res.error(function(data, status, headers, config) {
						console.log(data);
						alert("Server Error");
				});
		}

		$scope.getResumeDetails();
	}

	$scope.gotoEditResume = function(items){
		$rootScope.resumeDetails = items;
		$location.path('/edit_profile');
	}

	//change Password
	$scope.changePwd = function(){
		// alert("pwd");
		if (!$scope.currPassword) {
			alert('Please enter Current Password');
		} else if ($scope.currPassword == accessData.pass) {
			if($scope.newPassword && $scope.reTypePassword) {
				if ($scope.newPassword == $scope.reTypePassword) {
					var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

					var res = $http({
						method: 'PUT',
						url: 'http://183.82.1.143:9060/profiles',
						headers: {'Authorization': valuesToBasic},
						data: {
							"username": accessData.userName,
							"password": $scope.newPassword
						}
					});

					res.success(function(data, status, headers, config) {
						console.log(data);

						if(status >= 200 || status <300){
							alert("Password Changed Successfully.. ! You will be logged out of the session");
							$rootScope.signOut();
						}else {
							alert('Server Error');
						}

					});
					res.error(function(data, status, headers, config) {
							console.log(data);
							alert("Server Error");
					});
				}else {
					alert("New Password and Confirm Password Should be same");
				}
			}else {
				alert("Please enter all fields");
			}
		}else {
			alert('Warning! You have entered wrong Password');
		}
	}
});

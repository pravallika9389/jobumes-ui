app.controller("signupController", ['$scope','$http','$location','$route'])

function signupController($scope, $http,$location,$route) {				
	$scope.singUp=function(){
	
	  if($scope.userName && $scope.pass){
			var signUp = {};			
			signUp.userName = $scope.userName;
			signUp.password = $scope.password;
			signUp.email = $scope.email;
			signUp.mobile = $scope.mobile;
			var res = $http.post('/RoarRWS/RegisterUser', signUp);
			
			res.success(function(data, status, headers, config) {			
				if(status === 200 && data == 'valid'){
					$scope.isRegistered = true;
					 $scope.loginMessage = '';
					$location.path('/signin');
				    window.location.reload();						   
				}
				else{
					$scope.loginMessage =  status;
				}
				
			});
			res.error(function(data, status, headers, config) {
					console.log(data);
			});
			// Making the fields empty
			$scope.username='';
			$scope.password='';
			$scope.email = "";
			$scope.mobile = '';

	  }
	  else{
		  $scope.loginMessage = "Please enter your User Name / Password";
		  
	  }
	};
};

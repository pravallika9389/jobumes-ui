app.controller('signinController',function($scope,$http,$location){

		$scope.validatesignin=function(){
			alert("validatesignin");
	    	  if($scope.userName && $scope.pass){

					var userobj = {};
					userobj.userName = $scope.userName;
					userobj.pass = $scope.pass;
					var res = $http.post('http://localhost:8080/RoarRWS/authenticate', userobj);

					res.success(function(data, status, headers, config) {
						if(status === 200){
							if(data.data=='valid'){
							$location.path('/employee-dashboard');
							}
							else{
								$scope.userName='';
								$scope.pass='';
								$scope.myform.$setPristine();
								alert('user name and password is invalid');
							}
						}

					});
					res.error(function(data, status, headers, config) {
							console.log(data);
					});


	    	  }

			};

})

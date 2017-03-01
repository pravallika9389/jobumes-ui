app.controller('postaJobController', function($scope, $location) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}
});

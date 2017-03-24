app.controller("contentController", ['$scope', '$http', '$location', '$rootScope',
			function($scope, $http, $location, $rootScope) {

			var valuesToBasic = 'Basic ' + btoa('surya@snigdha.co.in' + ':' + 'password');

			// to get all posted jobs
			var res = $http({
				method: 'GET',
				url: 'http://183.82.1.143:9060/jobs',
				headers: {'Authorization': valuesToBasic}
			});
			res.success(function(data, status, headers, config) {
				if((status >= 200 || status < 300)){
					console.log(data);
					$rootScope.getAllJobs = [];
					data.forEach(function(element) {
						if (element.parsedJson.JobData.JobProfile[0] != '') {
							console.log(element.parsedJson.JobData.JobProfile[0]);
							$rootScope.getAllJobs.push(element.parsedJson.JobData);
						}

					})
					console.log($rootScope.getAllJobs);
				}
				else{
					alert("Error in retrieving Jobs");
				}

			});
			res.error(function(data, status, headers, config) {
					console.log(data);
					alert("Server error in retrieving Jobs");
			});

}]);

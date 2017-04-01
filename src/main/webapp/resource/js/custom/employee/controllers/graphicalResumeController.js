app.controller('graphicalResumeController',['$scope', '$location', '$rootScope', '$http',
			function($scope, $location, $rootScope, $http) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		$(".graphical_resume").addClass("active");
		$(".graphsume").removeClass("active");
		$(".emp_dashboard").removeClass("active");
		$(".myjobs").removeClass("active");
    $(".detailed_resume").removeClass("active");
    $(".my_documents").removeClass("active");

		$rootScope.userobj = accessData;
		$rootScope.returnData = returnData;
		$("#employeeheader").show();
		$("#signoutheader").show();
		$("#homeheader").hide();
		$("#employerheader").hide();
		$("#signinheader").hide();
		$("#footersection").hide();
		$(".hideclass").hide();

		$scope.getResumeDetails = function() {

				var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

				var res = $http({
					method: 'GET',
					url: 'http://183.82.1.143:9060/resumes',
					headers: {'Authorization': valuesToBasic},
				});

				$scope.hideGraph = false;
				$scope.showNoGraph = false;

				res.success(function(data, status, headers, config) {
					console.log(data);
					if(status >= 200 || status <300){
						// data.resumes.forEach(function(element){
						// 	coverLetterArr.push(element.details.ResumeParserData.Coverletter);
						// 	profileDetails.push(element);
						// })
						// $scope.coverLetterArr = coverLetterArr;
						// $scope.profileDetails = profileDetails;
						$scope.defaultResume = data.resumes[0];
						console.log(data.resumes[0]);
						var arrEdu = $scope.defaultResume.details.ResumeParserData.SegregatedExperience.WorkHistory;
						var eduSplitArr = [];
						var objEdu = {};
						var startDate, endDate;
						arrEdu.forEach(function(element, i){
							if (element.StartDate == null || element.StartDate == undefined ||
									element.EndDate == null || element.EndDate == undefined) {
								$scope.hideGraph = false;
								$scope.showNoGraph = true;
							}else {
								$scope.hideGraph = true;
								$scope.showNoGraph = false;
								objEdu = {};
								$scope.convertDate = function(dateTo) {
									var dateRet;
									var parts = dateTo.split('/');
									var datejson = {
									  "year": parts[2],
									  "month":parts[1], "day": parts[0]
									}
									// console.log(datejson);
									dateRet = datejson.month + '/' + datejson.day + '/' + datejson.year;
									console.log(dateRet);
									return dateRet;
								}
								startDate = $scope.convertDate(element.StartDate);
								endDate = $scope.convertDate(element.EndDate);
								var empAdd = element.Employer +'<br>'+ element.JobLocation.EmployerCountry + '<br>' + element.JobLocation.EmployerCountry;
								objEdu = {"id": i+1, "content": empAdd, "start": startDate, "end": endDate};
								eduSplitArr.push(objEdu);
								console.log(objEdu);
							}
						});

						// DOM element where the Timeline will be attached
					  var container = document.getElementById('visualization');

					  // Create a DataSet (allows two way data-binding)
						var items = new vis.DataSet(eduSplitArr);
						console.log(items);

					  // Configuration for the Timeline
					  var options = {};

					  // Create a Timeline
					  var timeline = new vis.Timeline(container, items, options);

						console.log(eduSplitArr);
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
		$rootScope.resumeDetailsToEdit = items;
		$location.path('/edit_profile');
	}

}]);

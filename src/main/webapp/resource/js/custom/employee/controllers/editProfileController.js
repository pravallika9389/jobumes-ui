app.controller('editProfileController',['$scope', '$location', '$rootScope', '$http',
			function($scope, $location, $rootScope, $http) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		if ($rootScope.resumeDetailsToEdit == undefined) {
			$location.path('/graphical-resume');
		}else {
			console.log($rootScope.resumeDetailsToEdit);

			$scope.personalDetails = {};
			$scope.personalDetails.resumeTitle = $scope.resumeDetailsToEdit.details.ResumeParserData.Objectives;
			$scope.personalDetails.expInYears = '';
			$scope.personalDetails.expInMonths = '';
			$scope.personalDetails.currentCTC = '';
			$scope.personalDetails.currentCTCThousand = '';
			$scope.personalDetails.expectedCTC = '';
			$scope.personalDetails.expectedCTCThousand = '';
			$scope.personalDetails.noticePeriod = '';
			$scope.personalDetails.mobility = '';
			$scope.personalDetails.currentLocation = $scope.resumeDetailsToEdit.details.ResumeParserData.CurrentLocation;
			$scope.personalDetails.preferredLoc = $scope.resumeDetailsToEdit.details.ResumeParserData.PreferredLocation;
			$scope.personalDetails.resumeTitle = '';
			$scope.personalDetails.industry = '';
			$scope.personalDetails.functionalArea = '';
			$scope.personalDetails.role = '';
			$scope.personalDetails.dobInDay = '';
			$scope.personalDetails.dobInMonth = '';
			$scope.personalDetails.dobInYear = '';
			$scope.personalDetails.gender = $scope.resumeDetailsToEdit.details.ResumeParserData.Gender;
			$scope.personalDetails.keySkills = $scope.resumeDetailsToEdit.details.ResumeParserData.Skills;
			$scope.personalDetails.experience = $scope.resumeDetailsToEdit.details.ResumeParserData.Experience;
			$scope.personalDetails.executiveSummary = $scope.resumeDetailsToEdit.details.ResumeParserData.ExecutiveSummary;

			$scope.educationDetails = {};
			$scope.educationDetails.degree = $scope.resumeDetailsToEdit.details.ResumeParserData.SegregatedQualification.EducationSplit[0].Degree;
			$scope.educationDetails.specialization = '';
			$scope.educationDetails.percentage = $scope.resumeDetailsToEdit.details.ResumeParserData.SegregatedQualification.EducationSplit[0].Aggregate.Value;
			$scope.educationDetails.university = '';
			$scope.educationDetails.completedYear = $scope.resumeDetailsToEdit.details.ResumeParserData.SegregatedQualification.EducationSplit[0].EndDate;
			$scope.educationDetails.courseType = '';

			$scope.primaryskill = {};
			$scope.primaryskill.skillName = '';
			$scope.primaryskill.skillExp = '';
			$scope.primaryskill.year = '';
			$scope.primaryskill.skillRating = '';

			$scope.empBean = {};
			$scope.empBean.employerName = '';
			$scope.empBean.status = '';
			$scope.empBean.designation = '';
			$scope.empBean.startMonth = '';
			$scope.empBean.startYear = '';
			$scope.empBean.endMonth = '';
			$scope.empBean.endYear = '';

			$scope.language = {};
			$scope.language.languageName = $scope.resumeDetailsToEdit.details.ResumeParserData.LanguageKnown;
			$scope.language.read = '';
			$scope.language.write = '';
			$scope.language.speak = '';

			$scope.certification = {};
			$scope.certification.certificationName = $scope.resumeDetailsToEdit.details.ResumeParserData.Certification;
			$scope.certification.certifiedOn = '';

			$scope.achievement = {};
			$scope.achievement.achievementName = $scope.resumeDetailsToEdit.details.ResumeParserData.Achievements;
		}
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

		// $scope.getResumeDetails = function() {
		//
		// 		var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);
		//
		// 		var res = $http({
		// 			method: 'GET',
		// 			url: 'http://183.82.1.143:9060/resumes',
		// 			headers: {'Authorization': valuesToBasic},
		// 		});
		//
		// 		res.success(function(data, status, headers, config) {
		// 			console.log(data);
		// 			if(status >= 200 || status <300){
		//
		// 			}else {
		// 				alert('Server Error');
		// 			}
		//
		// 		});
		// 		res.error(function(data, status, headers, config) {
		// 				console.log(data);
		// 				alert("Server Error");
		// 		});
		// }

		// $scope.getResumeDetails();

	}

		/** holds tabs, we will perform repeat on this **/
		$scope.tabs = [{
			id:1,
			content:'This is a default tab on load'
		}]

		$scope.languagetabs = [{
			id:1,
			content:'This is a default tab on load'
		}]

		$scope.experiencetabs = [{
			id:1,
			content:'This is a default tab on load'
		}]

		$scope.certificatetabs = [{
			id:1,
			content:'This is a default tab on load'
		}]

		$scope.counter = 1;
		/** Function to add a new tab **/
		$scope.addTab = function(){
			$scope.counter++;
			$scope.tabs.push({id:$scope.counter,content:'Any Content'});
			$scope.selectedTab = $scope.tabs.length - 1; //set the newly added tab active.
			document.getElementById('deleteEducation').style.display = 'block';
		}


		/** Function to delete a tab **/
		$scope.deleteTab = function(index)
		{
			if($scope.tabs.length == 2)
			{
				document.getElementById('deleteEducation').style.display = 'none';
			}

			$scope.tabs.splice(index,1); //remove the object from the array based on index
		}

		$scope.selectedTab = 0; //set selected tab to the 1st by default.

		/** Function to set selectedTab **/
		$scope.selectTab = function(index){
			$scope.selectedTab = index;
		}

		$scope.selectedLanguageTab = 0; //set selected tab to the 1st by default.


		$scope.Langcounter = 1;
		/** Function to set selectedTab **/
		$scope.selectLanguageTab = function(index){
			$scope.selectedLanguageTab = index;
		}

		$scope.addLanguageTab = function(){
			$scope.Langcounter++;
			$scope.languagetabs.push({id:$scope.Langcounter,content:'Any Content'});
			$scope.selectedLanguageTab = $scope.languagetabs.length - 1; //set the newly added tab active.
			document.getElementById('deleteLanguage').style.display = 'block';
		}


		$scope.deleteLanguageTab = function(index){
			if($scope.languagetabs.length == 2)
			{
				document.getElementById('deleteLanguage').style.display = 'none';
			}
			$scope.languagetabs.splice(index,1); //remove the object from the array based on index
		}

		$scope.selectedExperienceTab = 0; //set selected tab to the 1st by default.


		/** Function to set selectedTab **/
		$scope.Expcounter = 1;

		$scope.selectExperienceTab = function(index){
			$scope.selectedExperienceTab = index;
		}

		$scope.addExperienceTab = function(){
			$scope.Expcounter++;
			$scope.experiencetabs.push({id:$scope.Expcounter,content:'Any Content'});
			$scope.selectedExpereienceTab = $scope.experiencetabs.length - 1; //set the newly added tab active.
			document.getElementById('deleteExperience').style.display = 'block';
		}


		$scope.deleteExperienceTab = function(index){
			if($scope.experiencetabs.length == 2)
			{
				document.getElementById('deleteExperience').style.display = 'none';
			}
			$scope.experiencetabs.splice(index,1); //remove the object from the array based on index
		}

		$scope.Certcounter = 1;

		$scope.selectCertificateTab = function(index){
			$scope.selectedCertificateTab = index;
		}

		$scope.addCertificateTab = function(){
			$scope.Certcounter++;
			$scope.certificatetabs.push({id:$scope.Certcounter,content:'Any Content'});
			$scope.selectedCertificateTab = $scope.certificatetabs.length - 1; //set the newly added tab active.
			document.getElementById('deleteCertiicate').style.display = 'block';
		}


		$scope.deleteCertificateTab = function(index){
			if($scope.certificatetabs.length == 2)
			{
				document.getElementById('deleteCertiicate').style.display = 'none';
			}
			$scope.certificatetabs.splice(index,1); //remove the object from the array based on index
		}

}]);

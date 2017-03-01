app.controller('editProfileController',['$scope', '$location', function($scope, $location){

	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
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

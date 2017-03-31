var app = angular.module('jobumesApp', ['ngRoute']);

app.run(["$rootScope", "$window", "$location" , function($rootScope, $window, $location) {
  // localStorage.setItem('isCheckUser', 'empty');
    $rootScope.signOut = function(){
      localStorage.setItem('isCheckUser', 'empty');
      localStorage.setItem('userRole', 'empty');
      $("#employerheader").hide();
      $("#homeheader").show();
      $("#employeeheader").hide();
      $("#signinheader").show();
      $("#signoutheader").hide();
      $("#footersection").show();
      $location.path('/');
      window.location.reload();
    }
}]);

  // configure our routes
  app.config(function($routeProvider)
  {
    $routeProvider

    // route for the dashboard page
    .when('/', {
      templateUrl :'resource/pages/content/outside/content.html',
      controller  : 'contentController'
    })

    .when('/header', {
      templateUrl :'resource/pages/header/header.html',
      controller  : 'contentController'
    })


    .when('/admin', {
      templateUrl :'resource/admin/index.html',
      controller  : 'adminController'
    })

     .when('/admin/404', {
      templateUrl :'resource/admin/pages/content/404_error.html',
      controller  : 'adminController'
    })


    .when('/employee-dashboard', {
      templateUrl : 'resource/pages/content/employee/employee_dashboard.html',
      controller  : 'employeeDashboardController'
    })

    // route for the myjobs page
    .when('/my-jobs', {
      templateUrl : 'resource/pages/content/employee/myjobs.html',
      controller  : 'myJobsController'
    })

    // route for the visual_resumes page
    .when('/graphsume', {
      templateUrl : 'resource/pages/content/employee/graphsume.html',
      controller  : 'graphsumeController'
    })

    // route for the detailed_resume page
    .when('/detailed-resume', {
      templateUrl : 'resource/pages/content/employee/detailed_resumes.html',
      controller  : 'detailedResumeController',
      css : 'resource/admin/css/custom/style.css'
    })

    // route for the my_documents page
    .when('/my-video', {
      templateUrl : 'resource/pages/content/employee/my_video.html',
      controller  : 'myVideoController'
    })

    .when('/edit_profile', {
      templateUrl : 'resource/pages/content/employee/edit_profile.html',
      controller  : 'editProfileController'
    })

    .when('/profileviews', {
      templateUrl : 'resource/pages/content/employee/profileviews.html',
      controller  : 'profileViewsController'
    })

    .when('/downloads', {
      templateUrl : 'resource/pages/content/employee/downloads.html',
      controller  : 'downloadsController'
    })

    .when('/client_schedules', {
      templateUrl : 'resource/pages/content/employee/client_schedules.html',
      controller  : 'clientSchedulesController'
    })

    .when('/graphical-resume', {
      templateUrl : 'resource/pages/content/employee/graphical_resume.html',
      controller  : 'graphicalResumeController'
      // controller: 'editProfileController'
    })

    // Employee Route and Controllers end

    // Employer Route and Controllers Start
    .when('/employer-dashboard', {
      templateUrl : 'resource/pages/content/employer/employer_dashboard.html',
      controller  : 'employerDashboardController'
    })

    .when('/posted-jobs', {
      templateUrl :'resource/pages/content/employer/posted_jobs.html',
      controller  : 'postedJobsController'
    })

    // route for the myjobs page
    .when('/postajob', {
      templateUrl : 'resource/pages/content/employer/postajob.html',
      controller  : 'postaJobController'
    })

    .when('/edit-posted-job', {
      templateUrl : 'resource/pages/content/employer/edit_posted_job.html',
      controller  : 'editPostedJobController'
    })

    .when('/posted_job_list', {
      templateUrl : 'resource/pages/content/employer/posted_job_list.html',
      controller  : 'postedJobListController'
    })

    // route for the visual_resumes page
    .when('/boolean-search', {
      templateUrl : 'resource/pages/content/employer/boolean_search.html',
      controller  : 'booleanSearchController'
    })

    // route for the detailed_resume page
    .when('/my-favourite', {
      templateUrl : 'resource/pages/content/employer/my_favourite.html',
      controller  : 'myFavouriteController'
    })

    // route for the upload_resumes page
    .when('/saved-search', {
      templateUrl : 'resource/pages/content/employer/saved_search.html',
      controller  : 'savedSearchController'
    })

    .when('/saved-resumes', {
      templateUrl : 'resource/pages/content/employer/saved_resumes.html',
      controller  : 'savedResumesController'
    })
    // Employer Route and Controller end

    // Outside Route and Controller Start
    .when('/signup', {
      templateUrl : 'resource/pages/content/outside/signup.html',
      controller  : 'signupController'
    })

    .when('/signin', {
      templateUrl : 'resource/pages/content/outside/signin.html',
      controller  : 'signinController'
    })

    .when('/employee-home', {
      templateUrl : 'resource/pages/content/outside/employee_home.html',
      controller  : 'employeeHomeController'
    })

    .when('/employer-home', {
      templateUrl : 'resource/pages/content/outside/employer_home.html',
      controller  : 'employerHomeController'
    })

    .when('/search-results', {
      templateUrl : 'resource/pages/content/outside/search_results.html',
      controller  : 'searchResultsController'
    })
    .when('/company-detail', {
      templateUrl :'resource/pages/content/outside/company_detail.html',
      controller  : 'companyDetailController'
    })

    .when('/single-job-detail', {
      templateUrl : 'resource/pages/content/outside/single_job_detail.html',
      controller  : 'singleJobDetailController'
    })

    .when('/contact', {
      templateUrl : 'resource/pages/content/outside/contact.html',
      controller  : 'contactController'
    })

    .when('/job-alert', {
      templateUrl : 'resource/pages/content/outside/create_job_alert.html',
      controller  : 'createJobAlertController'
    })

    .when('/about', {
      templateUrl : 'resource/pages/content/outside/about_us.html',
      controller  : 'aboutController'
    })

    .when('/forgot-password', {
      templateUrl : 'resource/pages/content/outside/forgot_password.html',
      controller  : 'forgotPasswordController'
    })

    .when('/reset-password', {
      templateUrl : 'resource/pages/content/outside/reset_password.html',
      controller  : 'resetPasswordController'
    })

    .when('/profile-settings', {
      templateUrl : 'resource/pages/content/outside/profile.html',
      controller  : 'profileSettingsController'
    })

    .when('/register', {
      templateUrl : 'resource/pages/content/outside/register.html',
      controller  : 'registerController'
    })

    .when('/employer-register', {
      templateUrl : 'resource/pages/content/outside/employer-register.html',
      controller  : 'employerRegisterController'
    })

    .when('/404-error', {
      templateUrl : 'resource/pages/content/outside/404_error.html',
      controller  : '404ErrorController'
    })

    .when('/terms-and-conditions', {
      templateUrl : 'resource/pages/content/outside/terms_and_conditions.html',
      controller  : 'termsController'
    })

    .when('/get-demo', {
      templateUrl : 'resource/pages/content/outside/getdemo.html',
      controller  : 'getDemoController'
    })

    .when('/give-feedback', {
      templateUrl : 'resource/pages/content/outside/givefeedback.html',
      controller  : 'givefeedbackController'
    })
    // Outside Route and Controller end

    // for fb login callback
    .when('/fbLoginCallback', {
      templateUrl : 'resource/pages/content/outside/oauthcallback.html',
      controller : 'fbLoginCallbackContoller'
    })

  });

  app.controller('fbLoginCallbackContoller', function ($scope) {
    window.opener.openFB.oauthCallback(window.location.href);
    window.close();
  });

  app.controller('MyController', function ($scope)
      {

		$scope.init = function(tabtype)
		{
		  $scope.tabtype = tabtype;
		  alert();
		}
        //This will hide the DIV by default.
        $scope.matchedjobs = true;
        $scope.appliedJobs = false;
        $scope.search_jobs = false;

        $scope.getMyMatchedJobs = function ()
        {
          //If DIV is visible it will be hidden and vice versa.
          //$scope.IsVisible = $scope.IsVisible ? false : true;
          $scope.matchedjobs = true;
          $scope.appliedJobs = false;
          $scope.search_jobs = false;
        }

        $scope.getAppliedJobs = function ()
        {
          //If DIV is visible it will be hidden and vice versa.
          //$scope.IsVisible = $scope.IsVisible ? false : true;
          $scope.appliedJobs = true;
          $scope.matchedjobs = false;
          $scope.search_jobs = false;
        }

        $scope.gotoTab3 = function ()
        {
          //If DIV is visible it will be hidden and vice versa.
          //$scope.IsVisible = $scope.IsVisible ? false : true;
          $scope.search_jobs = true;
          $scope.appliedJobs = false;
          $scope.matchedjobs = false;
        }
      });

  //for fb login
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '567085660166390',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();

   // ...
   app.factory('facebookService', function($q) {
       return {
           getMyDetails: function() {
               var deferred = $q.defer();
               FB.api('/me', {
                   fields: 'id,first_name,last_name,middle_name,gender,email'
               }, function(response) {
                   if (!response || response.error) {
                       deferred.reject('Error occured');
                   } else {
                       deferred.resolve(response);
                   }
               });
              //  to get accessToken
               var accessToken = FB.getAuthResponse();
               console.log(accessToken);
               return deferred.promise;
           }
       }
   });

   app.directive('fileModel', ['$parse', function ($parse) {
   	return {
   		 restrict: 'A',
   		 link: function(scope, element, attrs) {
   				var model = $parse(attrs.fileModel);
   				var modelSetter = model.assign;

   				element.bind('change', function(){
   					 scope.$apply(function(){
   							modelSetter(scope, element[0].files[0]);
   					 });
   				});
   		 }
   	};
   }]);

   app.service('fileUpload', ['$http', function ($http) {

    var accessData = angular.fromJson(window.localStorage['userObj']);
   	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
   	var user = localStorage.getItem('isCheckUser');

    var accessData = angular.fromJson(window.localStorage['userObj']);

   	this.uploadFileToUrl = function(file, uploadUrl, successMsg){
      // console.log(uploadUrl + ", " +successMsg );
   	// 	uploadUrl = 'http://183.82.1.143:9060/resumes';
   		 var fd = new FormData();
   		 fd.append('file', file);
   		//  user details
   		 var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

   		 $http.post(uploadUrl, fd, {
   				transformRequest: angular.identity,
   				headers: {
   					'Authorization': valuesToBasic,
   					'Content-Type' : undefined
   				}
   		 })

   		 .success(function(){
   			 alert(successMsg);
   		 })

   		 .error(function(){
   			 alert("Error Occured");
   		 });
   	}
   }]);

   app.service('putFileUpload', ['$http', function ($http) {

    var accessData = angular.fromJson(window.localStorage['userObj']);
   	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
   	var user = localStorage.getItem('isCheckUser');

    var accessData = angular.fromJson(window.localStorage['userObj']);

   	this.uploadFileToUrl = function(file, uploadUrl, successMsg){
      // console.log(uploadUrl + ", " +successMsg );
   	// 	uploadUrl = 'http://183.82.1.143:9060/resumes';
   		 var fd = new FormData();
   		 fd.append('file', file);
   		//  user details
   		 var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

   		 $http.put(uploadUrl, fd, {
   				transformRequest: angular.identity,
   				headers: {
   					'Authorization': valuesToBasic,
   					'Content-Type' : undefined
   				}
   		 })

   		 .success(function(){
   			 alert(successMsg);
   		 })

   		 .error(function(){
   			 alert("Error Occured");
   		 });
   	}
   }]);

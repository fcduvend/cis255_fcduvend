//Frank Duvendack
//angularCourses.js
//Angular Course Lookup
//2016.12.07

//Access svsu courses api and get the description and # credits of courses with specified prefix and courseNumber

var getcourse = angular.module('appGetCourse', []);

getcourse.controller('ctrlGetCourse', function($scope) {
  //initialize inPrefix & inCourseNumber
  $scope.inPrefix = '';
  $scope.inCourseNumber = '';

  //user clicks 'Get Course' button
  $scope.getCourses = function() {

    //make sure that the user has input something
    if($scope.inPrefix != '' && $scope.inCourseNumber != '') {

      //get json from svsu courses api giving prefix and coursenumber
      $.getJSON('https://api.svsu.edu/courses?prefix=' + $scope.inPrefix + '&courseNumber=' + $scope.inCourseNumber, function(data) {
          if(data.courses.length > 0) {

            //prepend a new h2 holding course title and a new p holding course description to div coursesLog
            $("#coursesLog").prepend("<h2>" + data.courses[0].title +
                                     "</h2><p>" + data.courses[0].description +
                                     "</p><p>Credits: " + data.courses[0].credit +
                                     "</p>");
            $(".userinputs").val("");
            $("#txtPrefix").focus();
          }
      });
    }
  };
});

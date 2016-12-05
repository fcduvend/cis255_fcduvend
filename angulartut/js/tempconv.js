//Frank Duvendack
//tempconv.js
//Temperature Converter
//2016.12.05
//
//Converts between Fahrenheit and Celcius

var tempConv = angular.module('tempconv', []);

tempConv.controller('ctrlTempConv', function($scope) {
  $scope.tempC = 0;
  $scope.tempF = 0;

  $scope.calcCel = function() {
    $scope.tempC = (+$scope.inFah - 32) / 1.8;
  };

  $scope.calcFah = function() {
    $scope.tempF = (+$scope.inCel * 1.8) + 32;
  };
});

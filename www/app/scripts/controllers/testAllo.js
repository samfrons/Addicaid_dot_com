'use strict';

angular.module('addicaidApp')
  .controller('TestAlloCtrl', ['$scope', 'geolocation', function($scope, geolocation) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var intervalId = setInterval(function() {
      geolocation.getCurrentPosition(function(position) {
        $scope.position = position;
        console.log('new pos', position.coords);
//        alert('Latitude: '              + position.coords.latitude          + '\n' +
//          'Longitude: '             + position.coords.longitude         + '\n' +
//          'Altitude: '              + position.coords.altitude          + '\n' +
//          'Accuracy: '              + position.coords.accuracy          + '\n' +
//          'Altitude Accuracy: '     + position.coords.altitudeAccuracy  + '\n' +
//          'Heading: '               + position.coords.heading           + '\n' +
//          'Speed: '                 + position.coords.speed             + '\n' +
//          'Timestamp: '             + position.timestamp                + '\n');
      });
    }, 100);

    $scope.$on('$destroy', function() {
      clearInterval(intervalId);
      console.log('destroy');
    });



  }]);

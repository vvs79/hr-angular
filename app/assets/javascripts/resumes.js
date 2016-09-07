'use strict';

angular.module("appResume", ['ngResource', 'ui.bootstrap', 'templates', 'ngRoute'])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "resumes/index.html"
    })
})
.factory("Resume", function($resource) {
  return $resource("/resumes/:id/:action.json", {id: "@id", 'update': {method: 'PATCH'} });
})
.controller('ResumeCtrl', function($scope, Resume) {
  $scope.resumes = Resume.query();

  $scope.addResume = function() {
    var resum = Resume.save($scope.newResume);
    $scope.resumes.push(resum);
    $scope.newResume = {};
  }

  $scope.removeResume = function(res) {
    res.$remove();
    $scope.resumes.splice($scope.resumes.indexOf(res), 1);
  }
});

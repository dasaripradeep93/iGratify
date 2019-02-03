/// <reference path="LandingPageService.js" />
/// <reference path="../../scripts/angular.min.js" />


var app = angular.module("LandingPageModule", []);
app.controller('LandingPageCtrl', ['$scope', function ($scope) {
    console.log('Landing Page');
    var vm = this;
    vm.name = localStorage.getItem("loggedinUserName");
    vm.email = localStorage.getItem('loggedinemail');
}]);

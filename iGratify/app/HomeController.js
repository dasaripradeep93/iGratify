/// <reference path="HomeService.js" />
/// <reference path="../scripts/angular.min.js" />

var app = angular.module("myModule", []);
app.controller('HomeCtrl', ['$scope', 'HomeService', function ($scope, HomeService) {
    var vm = this;
    $scope.message = "iGraify";
    $scope.text = "Hello";

    $scope.send = function () {
        var input = { name: $scope.text }
        //$scope.output = HomeService.GetUserDetails(input);
        HomeService.GetGender().then(function (data) {
            console.log(data);
        });
    };


}]);

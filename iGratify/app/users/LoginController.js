/// <reference path="LoginService.js" />
/// <reference path="../../scripts/angular.min.js" />

var app = angular.module("LoginModule", []);
app.controller('LoginCtrl', ['$scope', 'LoginService', function ($scope, LoginService) {
    var vm = this;
    vm.userId = null;
    vm.password = null;

    vm.Login = function () {
        var input = { uid: vm.userId, pwd: vm.password }
        console.log(input);
        LoginService.ValidateUser(input).then(function (row) {
            console.log(row);
            var data = row;
            localStorage.setItem("loggedinUserName", row.data[0].FullName);
            localStorage.setItem("loggedinemail", row.data[0].Email);
            window.location.href = '../info/CompleteInfo.html';
        });
    }

    
}]);
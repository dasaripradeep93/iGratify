/// <reference path="CreateUserController.js" />
/// <reference path="../../scripts/angular.min.js" />
var serviceId = 'CreateUserService';
app.factory(serviceId, ['$rootScope', '$http', '$q',
    function CreateUserService($rootScope, $http, $q) {
        var service = {};
        service.GetGender = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "/api/CreateUser/getgender",
            }).then(function (response) {
                deferred.resolve(response);
            }, function (err, status) {
                //console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        service.GetProfession = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "/api/CreateUser/getProfession",
            }).then(function (response) {
                deferred.resolve(response);
            }, function (err, status) {
                //console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        service.GetDomain = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "/api/CreateUser/getDomain",
            }).then(function (response) {
                deferred.resolve(response);
            }, function (err, status) {
                //console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        service.GetEducation = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "/api/CreateUser/getEducation",
            }).then(function (response) {
                deferred.resolve(response);
            }, function (err, status) {
                //console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        service.SaveUserDetails = function (input) {
            console.log(input);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                data:input,
                url: "/api/CreateUser/saveUserDetails",
            }).then(function (response) {
                deferred.resolve(response);
            }, function (err, status) {
                //console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        service.GenerateOTP = function (input) {
            console.log(input);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                data: input,
                url: "/api/CreateUser/generateOTP",
            }).then(function (response) {
                deferred.resolve(response);
            }, function (err, status) {
                //console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        service.ValidateOTP = function (input) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                data: input,
                url: "/api/CreateUser/validateOTP",
            }).then(function (response) {
                deferred.resolve(response);
            }, function (err, status) {
                //console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        return service;

    }]);
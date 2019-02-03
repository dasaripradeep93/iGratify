/// <reference path="LoginController.js" />
/// <reference path="../../scripts/angular.min.js" />

var serviceId = "LoginService";
app.factory(serviceId, ['$rootScope', '$http', '$q',
    function LoginService($rootScope, $http, $q) {
        var service = {};

        service.ValidateUser = function (input) {
            console.log(input);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                data: input,
                url: "/api/Login/checkUser",
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
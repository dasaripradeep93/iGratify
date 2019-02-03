/// <reference path="HomeController.js" />
var serviceId = 'HomeService';
app.factory(serviceId,['$rootScope', '$http', '$q',
    function HomeService($rootScope, $http, $q) {
        console.log('1');
        var service = {};
        service.GetGender = function () {
            console.log('2');
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "/api/home/getgender",
            }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                //console.log(err);
                deferred.reject(status);
            });

            return deferred.promise;
        }
        return service;
}]);
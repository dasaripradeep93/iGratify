/// <reference path="../scripts/angular.min.js" />
var app = angular.module('Demo', ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        console.log($stateProvider);
      //  $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '/app/Menus/Header.html'
            })
            .state('test', {
                url: '/test',
                templateUrl: '/app/Templates/Test.html'
            })
         .state('welcome', {
             url: '/welcome',
             templateUrl: '/app/WelcomeScreen/LandingPage.html'
         });
    }]);


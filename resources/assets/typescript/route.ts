angular.module('trip').config(['$routeProvider', '$locationProvider', function ($routeProvider:ng.route.IRouteProvider, $locationProvider) {
    $routeProvider
        .when('/trip/:id', {
            templateUrl: '/templates/tripView.html',
            controller: 'TripViewController',
            controllerAs: 'tripView',
            title: 'Trip view',
            resolve:TripViewController.resolve
        })
        .when('/trip/:id/start', {
            templateUrl: '/templates/tripStart.html',
            controller: 'TripViewController',
            controllerAs: 'tripView',
            title: 'Trip start',
            resolve:TripViewController.resolveStart
        })
        .when('/', {
            templateUrl: '/templates/home.html',
            title: 'Home'
        });

    $locationProvider.html5Mode(true);
}]);
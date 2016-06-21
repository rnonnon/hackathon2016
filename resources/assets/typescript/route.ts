angular.module('trip').config(['$routeProvider', '$locationProvider', function ($routeProvider:ng.route.IRouteProvider, $locationProvider) {
    $routeProvider
        .when('/trip/:id', {
            templateUrl: '/templates/tripView.html',
            controller: 'TripViewController',
            controllerAs: 'tripView',
            title: 'Trip view'
        })
        .when('/', {
            templateUrl: '/templates/home.html',
            title: 'Home'
        });

    $locationProvider.html5Mode(true);
}]);
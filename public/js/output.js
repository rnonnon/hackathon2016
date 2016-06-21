angular.module('trip', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap'
]);
angular.module('trip').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
var app = angular.module("trip");
var TripViewController = (function () {
    function TripViewController() {
        this.maxRateValue = 5;
        this.isRateReadonly = false;
        this.totalRateValue = 20;
        this.numberOfRates = 5;
        this.computeRating();
    }
    TripViewController.prototype.computeRating = function () {
        this.rateValue = this.totalRateValue / this.numberOfRates;
    };
    return TripViewController;
}());
app.controller("TripViewController", TripViewController);

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
            title: 'Trip view',
            resolve: TripViewController.resolve
        })
            .when('/', {
            templateUrl: '/templates/home.html',
            title: 'Home'
        });
        $locationProvider.html5Mode(true);
    }]);
var app = angular.module("trip");
var TripViewController = (function () {
    function TripViewController(tripService, routeParams, tripData) {
        this.maxRateValue = 5;
        this.isRateReadonly = false;
        this.trip = tripData.trip;
        this.users = tripData.users;
        angular.element("body").css("background-image", "");
    }
    Object.defineProperty(TripViewController.prototype, "tripCreator", {
        get: function () {
            console.log(this.users[this.trip.created_by]);
            return this.users[this.trip.created_by];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripViewController.prototype, "locationsSize", {
        get: function () {
            return _.keys(this.trip.locations).length;
        },
        enumerable: true,
        configurable: true
    });
    TripViewController.$inject = ["TripService", "$routeParams", "tripData"];
    TripViewController.resolve = {
        tripData: ['TripService', '$route', function (tripService, $route) {
                return tripService.getTrip($route.current.params.id);
            }]
    };
    return TripViewController;
}());
app.controller("TripViewController", TripViewController);
var app = angular.module("trip");
var TripService = (function () {
    function TripService($http) {
        this.$http = $http;
    }
    TripService.prototype.getTrip = function (id) {
        return this.$http.get("/api/start/" + id).then(function (i) {
            var users = {};
            i.data.users.map(function (user) {
                users[user.id] = user;
            });
            return {
                trip: i.data.trips[id],
                users: users
            };
        });
    };
    TripService.$inject = ['$http'];
    return TripService;
}());
app.service("TripService", TripService);

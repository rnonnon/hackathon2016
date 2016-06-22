angular.module('trip', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'uiGmapgoogle-maps'
]).config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyB7dKAY4ddK_SdBbWMhG56SFzuAE3J_bQk',
            libraries: 'weather,geometry,visualization'
        });
    }]);
angular.module('trip').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/trip/:id', {
            templateUrl: '/templates/tripView.html',
            controller: 'TripViewController',
            controllerAs: 'tripView',
            title: 'Trip view',
            resolve: TripViewController.resolve
        })
            .when('/trip/:id/start', {
            templateUrl: '/templates/tripStart.html',
            controller: 'TripViewController',
            controllerAs: 'tripView',
            title: 'Trip start',
            resolve: TripViewController.resolveStart
        })
            .when('/', {
            templateUrl: '/templates/home.html',
            title: 'Home'
        });
        $locationProvider.html5Mode(true);
    }]);
var app = angular.module("trip");
var TripViewController = (function () {
    function TripViewController(tripService, routeParams, uiGmapGoogleMapApi, tripData, $location) {
        var _this = this;
        this.$location = $location;
        this.maxRateValue = 5;
        this.isRateReadonly = false;
        this.showMap = false;
        this.trip = tripData.trip;
        this.users = tripData.users;
        var paths = [];
        var markers = [];
        _.map(this.trip.locations, function (location) {
            var coords = {
                longitude: location.longitude,
                latitude: location.latitude
            };
            paths.push(coords);
            markers.push({
                id: location.id,
                coords: coords
            });
        });
        this.map = { center: { latitude: paths[0].latitude, longitude: paths[0].longitude } };
        uiGmapGoogleMapApi.then(function () {
            _this.map.markers = markers;
            _this.map.polylines = [
                {
                    id: 1,
                    path: paths,
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    },
                    editable: false,
                    draggable: false,
                    geodesic: true,
                    visible: true,
                    icons: [{
                            icon: {
                                path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                            },
                            offset: '25px',
                            repeat: '100px'
                        }]
                }];
        });
    }
    TripViewController.prototype.goToComments = function () {
        angular.element('html, body').animate({
            scrollTop: angular.element('#comments').offset().top
        }, 500);
    };
    Object.defineProperty(TripViewController.prototype, "tripCreator", {
        get: function () {
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
    TripViewController.prototype.startTrip = function () {
        this.$location.path("/trip/" + this.trip.id + "/start");
    };
    TripViewController.prototype.toggleMap = function () {
        this.showMap = !this.showMap;
        document.querySelector("#myCard").classList.toggle("flip");
    };
    TripViewController.$inject = ["TripService", "$routeParams", "uiGmapGoogleMapApi", "tripData", "$location"];
    TripViewController.resolve = {
        tripData: ['TripService', '$route', function (tripService, $route) {
                return tripService.getTrip($route.current.params.id);
            }]
    };
    TripViewController.resolveStart = {
        tripData: ['TripService', '$route', function (tripService, $route) {
                return tripService.startTrip($route.current.params.id);
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
        return this.$http.get("/api/index").then(function (i) {
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
    TripService.prototype.startTrip = function (id) {
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

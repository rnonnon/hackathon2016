angular.module('trip', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'uiGmapgoogle-maps'
]).config(['uiGmapGoogleMapApiProvider',function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyB7dKAY4ddK_SdBbWMhG56SFzuAE3J_bQk',
        libraries: 'weather,geometry,visualization'
    });
}]);
var app = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'components/home/home.html',
            controller : 'homeController'
        })
        .when('/about', {
            templateUrl: 'components/about/about.html',
            controller : 'aboutController'
        })
        .when('/poi', {
            templateUrl: 'components/poi/poi.html',
            controller : 'poiController'
        })
        .when('/register', {
            templateUrl: 'components/register/register.html',
            controller : 'registerController'
        })

        .when('/login', {
            templateUrl: 'components/login/login.html',
            controller : 'loginController'
        })

        .when('/favorites', {
            templateUrl: 'components/favoritePoi/favoritePoi.html',
            controller : 'favoritePoiController'
        })
        .otherwise({ redirectTo: '/' });
}]);
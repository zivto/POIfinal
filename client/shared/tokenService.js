angular.module('myApp')
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('setHeadersToken',['$http', function ($http) {

        let token = ""

        this.set = function (t) {
            token = t
            $http.defaults.headers.common['x-access-token'] = t
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
            console.log("set")

        }
    }])
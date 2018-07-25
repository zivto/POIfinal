angular.module('myApp')
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('showHideService',[ function() {

        this.registered = false
        this.notLogined = true
        this.logined = false

        // this.setR = function (bool) {
        // registered = bool
        //     console.log("setR")
        // }

        // this.setN = function (bool) {
        //     notLogined = bool
        //         console.log("setR")
        // }

        // this.setL = function (bool) {
        //     logined = bool
        //         console.log("setR")
        // }

    }])
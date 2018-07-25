angular.module('myApp').controller('indexController', ['setHeadersToken','localStorageService','$http','$scope','$location',
    function (setHeadersToken, localStorageService,$http,$scope,$location) {

        $scope.notLogined = true
        $scope.registered = false
        $scope.logined = false

        $scope.user = {
            "user_name" : "Guest" ,
            "token" : localStorageService.get("token")
        }

        $scope.$on('user', function(event, arg){
            console.log(arg)
            $scope.user.user_name = arg;
            $scope.notLogined = false
            $scope.registered = true
            $scope.logined = true
        })

        $scope.userLogined = function(){
            var checkUserName = localStorageService.get("user_name")
            if(checkUserName!="Guest" && checkUserName!=undefined && checkUserName!=null){
                return true
            }
            return false
        }

        $scope.log_out = function(){
            var logout = confirm("are you sure you want to log out?")
            if(logout){
                localStorageService.clearAll()
                $location.path('/')
                $scope.user.user_name = "Guest"
                $scope.$broadcast('logout', $scope.user.user_name)
                $scope.notLogined = true
                $scope.registered = false
                $scope.logined = false
            }

        }


        $http.post("http://localhost:3001/users/getUserName", $scope.user)
        .then(function (response) {
            //console.log(response.data.success)
            if(response.data.success == false){
                //console.log("im here")
                $scope.user.user_name = "Guest"
                $scope.notLogined = true
                $scope.registered = false
                $scope.logined = false
            }
            else{
                $scope.user.user_name = response.data
                $scope.notLogined = false
                $scope.registered = true
                $scope.logined = true
            }
        }).catch((err) => {
            console.log(err)
        })    

        // $scope.notLogined = showHideService.notLogined
        // $scope.registered = showHideService.registered
        // $scope.logined = showHideService.logined

        // console.log($scope.notLogined)
        // console.log($scope.registered)
        // console.log($scope.logined)
        
        // showHideService.setL = $scope.notLogined
        // showHideService.setR = $scope.registered
        // showHideService.setN = $scope.logined

        // console.log(showHideService.setL)
        // console.log(showHideService.setR)
        // console.log(showHideService.setN)

        

    }]);
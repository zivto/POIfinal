angular.module("myApp")
    .controller('poiController',['localStorageService','$http','$scope', '$location', function (localStorageService, $http, $scope, $location) {
        
        $scope.numOfFav = ""

        $scope.user = {
            "user_name" : "Guest" ,
            "token" : localStorageService.get("token")
        }

        $scope.categories = []
        $scope.favorites = []
        $scope.delete = []
        $scope.reviews = []
        $scope.generalPOI = []


        $scope.$on('logout', function(event, arg){
            $scope.user.user_name = arg;
        })

        $scope.checkUser = function(){
            var check = localStorageService.get("user_name")
            if(check!="Guest" && check!=undefined && check!=null){
                return true
            }
            return false
        }

        $http.get('http://localhost:3001/users/numberOfFavoritePOI')
        .then(function(response){
            $scope.numOfFav = response.data.numOfFavPOI
            //console.log($scope.categories)
        })
        .catch((err) => {
            console.log(err)
        })

        $scope.locationToFav = function() {
            $location.path('/favorites')
        }

        $http.get('http://localhost:3001/poi/getAllCategories')
        .then(function(response){
            $scope.categories = response.data
            //console.log($scope.categories)
        })
        .catch((err) => {
            console.log(err)
        })

        $http.get('http://localhost:3001/poi/getAllPOI')
        .then(function(response){
            //console.log(response.data)
            $scope.generalPOI = response.data
        })
        .catch((err) => {
            console.log(err)
        })

        $http.post('http://localhost:3001/users/getUserName',$scope.user)
        .then(function (response) {
            if(response.data.success == false){
                $scope.user.user_name = "Guest"
                localStorageService.remove("user_name")
                $scope.notLogined = true
                $scope.registered = false
                $scope.logined = false
            }
            else{
                $scope.user.user_name = response.data
                $scope.notLogined = false
                $scope.registered = true
                $scope.logined = true

        $http.get('http://localhost:3001/users/twoUserPOI')
        .then(function (response) {
            //console.log(response)
            $scope.popularpPoints = response.data
            console.log($scope.popularpPoints)
            //console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })

        $http.get('http://localhost:3001/users/twoLastPOI')
        .then(function (response) {

            $scope.lastpPoints = response.data
            //console.log(response.data)

        }).catch((err) => {
            console.log(err)
        })
            }
        }).catch((err) => {
            console.log(err)
        })

        
        // add or remove poi to / from favorites
        $scope.addDeleteToFav = function (POI) {
            var checkPOI = localStorageService.get(POI.POI_name)
            //console.log(checkPOI)
            if(checkPOI != null){
                localStorageService.remove(POI.POI_name)
                var index1 = $scope.favorites.indexOf(POI.POI_name);
                $scope.favorites.splice(index1, 1);

                $scope.delete.push({"POI_name" : POI.POI_name})

                //console.log($scope.favorites)
                //console.log($scope.delete)
            }
            else{
                localStorageService.set(POI.POI_name,POI)
                $scope.favorites.push({"POI_name" : POI.POI_name})
                
                var index2 = $scope.delete.indexOf(POI.POI_name);
                $scope.delete.splice(index2, 1);

                //console.log($scope.favorites)
                //console.log($scope.delete)
            }
        }

        $scope.checkPointInFavorites = function(POI_name){
            var checkPOI = localStorageService.get(POI_name)
            if(checkPOI != null){
                return true
            }
            return false

        }

        $scope.saveToDB = function(){
            for(var i = 0; i < $scope.favorites.length; i++){
                console.log($scope.favorites[i])
                $http.post('http://localhost:3001/users/saveFavoritePOI', $scope.favorites[i])
                    .then(function (response) {
                        $scope.numOfFav += 1
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            for(var i = 0; i < $scope.delete.length; i++){
                console.log($scope.delete[i])
                $http.delete('http://localhost:3001/users/removeFavoritePOI/' + $scope.delete[i]["POI_name"])
                        .then(function (response) {
                            $scope.numOfFav -= 1
                        }).catch((err) => {
                        console.log(err)
                    })
                }
                alert("Points Saved")
            }

            $scope.selected= ""


            $scope.getReviews = function(POI){
                $http.get('http://localhost:3001/poi/getReviews/' + POI.POI_name)
                    .then(function (response) {
                        $scope.reviews = response.data
                        $scope.selected = POI

                    }).catch((err) => {
                        console.log(err)
                    })
            }

            $scope.propertyName = ""

            $scope.sortBy = function(propertyName) {
                $scope.propertyName = propertyName;
            };

            $scope.filter = {category: ""};

           


}]);
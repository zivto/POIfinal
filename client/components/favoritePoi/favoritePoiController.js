angular.module("myApp")
    .controller('favoritePoiController',['localStorageService','$location','$http','$scope', function (localStorageService, $location, $http, $scope) {

        $scope.favoritePoints =[]

        var checkUserName = localStorageService.get("user_name");
        if(checkUserName!="Guest" && checkUserName!=undefined){
            $http.get('http://localhost:3001/users/FavoritesPOI')
                .then(function (response) {
                $scope.favoritePoints = response.data
                console.log($scope.favoritePoints)
                }).catch((err) => {
                    console.log(err)
                })
        }

        $scope.propertyName = ""

        $scope.sortBy = function(propertyName) {
            $scope.propertyName = propertyName;
            console.log( $scope.propertyName)
          };

          $scope.removePoint = function(POI){
            localStorageService.remove(POI.POI_name)
            $http.delete('http://localhost:3001/users/removeFavoritePOI/' + POI.POI_name)
                        .then(function (response) {
                            var index = $scope.favoritePoints.indexOf(POI);
                            $scope.favoritePoints.splice(index, 1);
                            alert("Point Removed")
                        }).catch((err) => {
                        console.log(err)
                    })
                }

                $scope.review ={
                    "POI_name" : "",
                    "review" : "",
                    "rating" : ""
                }

                $scope.reviewPoint = function(POI){

                    $scope.review.POI_name = POI.POI_name
                    
                    $http.post('http://localhost:3001/users/reviewPOI', $scope.review)
                        .then(function (response) {
                            $scope.review.POI_name = ""
                            $scope.review.review = ""
                            $scope.review.rating = ""

                        alert("Your review is saved")
                        }).catch((err) => {
                            console.log(err)
                        })
                }

}])
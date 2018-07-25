angular.module('myApp')
    .controller('homeController', ['$http','$scope',function($http,$scope) {

        $http.get('http://localhost:3001/poi/threeRandomPOI')
        .then(function (response) {

            $scope.points = response.data
            console.log(response.data)
            // }
            // , function(response){
            // $scope.content = "Went Wrong"
        }).catch((err) => {
            console.log(err)
        })
    

 }]);
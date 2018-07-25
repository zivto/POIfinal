angular.module("myApp")
        .controller('loginController',['setHeadersToken','$location','localStorageService','$http','$rootScope','$scope', function (setHeadersToken, $location,localStorageService,$http,$rootScope, $scope) {

     
        $scope.user = {
            "user_name" : null,
            "password" : null
        }        

        $scope.submitForm = function(isValid) {
            if (isValid) {
                $http.post("http://localhost:3001/guests/login", $scope.user)
                .then(function (response) {
                    console.log(response.data)
                    if (response.data=="There is no such user"){
                        alert('There is no such user');
                    }
                    else{
                        //$scope.msg = "Post Data Submitted Successfully!"
                        //localStorage.clear()
                        localStorageService.set("token",response.data)
                        localStorageService.set("user_name", $scope.user.user_name)
                        $rootScope.$broadcast('user', $scope.user.user_name)
                        setHeadersToken.set(response.data)
                        alert('logged in successfully');
                        $location.path('/.html')
                    }
                    }).catch((err) => {
                        console.log(err)
                    })                    
            }
            
            else{
                alert('please insert your user_name and password')
            }
        }

        $scope.forget = {
            user_name : "",
            email : "" ,
            answer : ""

        }

        $scope.questForget = ""
        $scope.forg2 = false

        $scope.forget1 = function(user_name){
            $http.get('http://localhost:3001/guests/forgetPassword/' + user_name)
                .then(function(response){
                    if(response.data!="Error"){
                        $scope.questForget = response.data
                        $scope.forg2 = true
                    }
                    else{
                        alert("Field is incorrect")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }


        $scope.forget2 = function(){
            $http.post('http://localhost:3001/guests/forgetPasswordAnswer', $scope.forget)
                .then(function(response){
                    if(response.data == "OK"){
                        alert("check your email")
                    }
                    else{
                        alert("One or more fields are incorrect")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }])
angular.module("myApp")
    .controller('registerController',['$http','$scope','$location', function ($http, $scope, $location) {
                
        $scope.user = {
            "user_name" : null ,
            "password" : null ,
            "first_name" : null ,
            "last_name" : null ,
            "city" : null ,
            "country" : null ,
            "email" : null ,
            "question" : null ,
            "answer" : null,
            "categories" : []
        }

        $http.get('countries.xml').then((response) => {
            $scope.countries = (xml2json($.parseXML(response.data))).Countries.Country;
        });

        $scope.questions = [
            {question : 'What is your T-shirt size?'},
            {question : 'What Airline do you prefer?'},
            {question : 'What is your favorite dinner?'},
            {question : 'What is your favorite animal?'},
            {question : 'What is the best type of cheese?'}
        ]

        $scope.Categories = [
            {name : 'Nature & Parks'},
            {name : 'Concerts & Shows'},
            {name : 'Shopping'},
            {name : 'Nightlife'}
        ]

        $scope.selectAllCategories = function(){
            console.log($scope.chkAll)
            if($scope.chkAll == true){
                $scope.user.categories = $scope.Categories.map(x=>x)
            }
            else{
                $scope.user.categories = []
            }
        }

        $scope.toggleSelection = function toggleSelection(category){
            var idx = $scope.user.categories.indexOf(category)
            if(idx < 0){
                $scope.user.categories.push(category)
            }
            else{
                $scope.user.categories.splice(idx,1)
            }
        }

        $scope.submitForm = function(isValid) {
            if (isValid) {
                
                $http.post("http://localhost:3001/guests/register", $scope.user)
                .then(function (response) {
                    if (response.data=="User name already exists"){
                        alert("User name already exists")
                    }
                    else{
                        alert('form submitted');
                        $location.path('/login')
                    }

                    }).catch((err) => {
                        console.log(err)
                    })
            }
            
            else{
                alert('please fill out form correctly')
            }
        }

}]);

function xml2json(xml) {
    try {
        var obj = {};
        if (xml.children.length > 0) {
            for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = xml2json(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];

                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xml2json(item));
                }
            }
        } else {
            obj = xml.textContent;
        }
        return obj;
    } catch (e) {
        console.log(e.message);
    }
}
'use strict';
var myAppModule = angular.module('myApp', []);
myAppModule.controller('PersonalDataController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.no_confirm = true;
        $scope.add_button = "Add Another Person";
        $scope.confirm = function (isValid) {
            if (isValid) {
                if (!$scope.no_confirm) {
                    $scope.add_button = "Add Another Person";
                    $scope.no_confirm = true;
                }
                else {
                    $scope.add_button = "Back";
                    $scope.no_confirm = false;
                }
            } else {
                $scope.submitted = true;
                $scope.no_confirm = true;
            }
        };

        $scope.continue = function (isValid) {
            if (isValid) {
                var result = {
                    email: $scope.email, //or this.personForm.email
                    firstname: $scope.firstname,
                    surname: $scope.surname,
                    company: $scope.company,
                    address: $scope.address,
                    city: $scope.city,
                    postcode: $scope.postcode,
                    hometelephone: $scope.hometelephone,
                    mobile: $scope.mobile,
                    birthdate: $scope.birthdate,
                    description: $scope.description,
                    gender: $scope.gender,
                    membership: $scope.membership
                };
                console.log(result);
                $http.post("somewhere/in-the-server.php", {data: result})
                    .success(function (res) {
                        console.log(res);
                    });
            }
        };

    }
]);

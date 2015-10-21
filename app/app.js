'use strict';

var myAppModule = angular.module('myApp', ['ngRoute', 'pascalprecht.translate'],
    ['$translateProvider', function ($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            'prefix': 'app/i18n/locale-',
            'suffix': '.json'
        });
        $translateProvider.preferredLanguage('en_US');
        $translateProvider.useSanitizeValueStrategy(null);
    }]);


myAppModule.controller('PersonalDataController', ['$scope', '$http', '$translate',
    function ($scope, $http, $translate) {


        $scope.toggleLanguage = function (lang) {
            // $translate.uses(($translate.uses() === 'en_US') ? 'es' : 'en_US');
            $translate.use(lang);
        };

        $scope.no_confirm = true;
        $scope.add_button = "addNewPersonButton";
        $scope.confirm = function (isValid) {
            if (isValid) {
                if (!$scope.no_confirm) {
                    $scope.add_button = "addNewPersonButton";
                    $scope.no_confirm = true;
                }
                else {
                    $scope.add_button = "backButton";
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

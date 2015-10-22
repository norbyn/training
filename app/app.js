'use strict';
var myAppModule = angular.module('myApp', ['pascalprecht.translate', 'ngCookies', 'LocalStorageModule'],
    ['$translateProvider', 'localStorageServiceProvider', function ($translateProvider, localStorageServiceProvider) {

        $translateProvider.useStaticFilesLoader({
            'prefix': 'app/i18n/locale-',
            'suffix': '.json'
        });
        $translateProvider.useSanitizeValueStrategy(null);

        localStorageServiceProvider.setPrefix('training');
    }]);



myAppModule.controller('PersonalDataController', ['$scope', '$http', '$location','$translate', '$cookieStore', 'localStorageService',
    function ($scope, $http, $location,  $translate, $cookieStore, localStorageService) {

        var defaultLang = localStorageService.get('lang');
        if (!defaultLang){
            defaultLang = "en_us";
            localStorageService.set('lang', defaultLang);
        }
        $translate.use(defaultLang);

        $scope.toggleLanguage = function (lang) {
            $translate.use(lang);
            localStorageService.set("lang", lang);
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

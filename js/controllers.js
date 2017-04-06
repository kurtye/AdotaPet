angular.module('app.controllers', [])

    .controller('adoteCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

            var db = firebase.database();
            var ref = db.ref("user/1");

            ref.on("value", function (snapshot) {

                $scope.pets = snapshot.val();

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

        }])

    .controller('desaparecidosCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {


        }])

    .controller('perfilCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {


        }])

    .controller('menuCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {


        }])

    .controller('loginCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {


        }])

    .controller('filtrosCtrl', ['$scope', '$stateParams',

        function ($scope, $stateParams) {


        }])

    .controller('addPetCtrl', ['$scope', '$stateParams',


        function ($scope, $stateParams) {


            $scope.pet = {};

            $scope.addPet = function (pet) {
                // $scope.pets.push(pet);

                firebase.database().ref('user/1').push(pet)

                $scope.pet = {}
            }

        }])

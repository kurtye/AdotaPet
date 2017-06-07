angular.module('adoteCtrls', []).controller('adoteCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'PetService',
    function ($scope, $stateParams, $state, $rootScope, PetService) {

        var pets = [];
        $rootScope.pets = pets;

        var usuario = $rootScope.usuario;

        PetService.getPets().on("value", function (snap) {
            pets.push(snap.val());
        }, function (errorObject) {
            console.log("Erro na leitura do banco " + errorObject.code);
        });
        console.log(pets, 'adote');

        $scope.detalharPet = function (id) {
          $state.go('tabsController.perfil/:id', {id:id});

        };
    }]);
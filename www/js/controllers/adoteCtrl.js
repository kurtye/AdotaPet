angular.module('adoteCtrls', []).controller('adoteCtrl', ['$scope', '$stateParams', '$rootScope', 'PetService',
    function ($scope, $stateParams, $rootScope, PetService) {

        var pets = [];
        $rootScope.pets = pets;

        var usuario = $rootScope.usuario;

        PetService.getPets().on("child_added", function (snap) {
            pets.unshift(snap.val());
            //pets.push(snap.key);
            console.log(pets);

        }, function (errorObject) {
            console.log("Erro na leitura do banco " + errorObject.code);
        });

    }]);
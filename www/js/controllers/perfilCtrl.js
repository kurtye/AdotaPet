angular.module('perfilCtrls', []).controller('perfilCtrl', ['$scope', '$rootScope', '$stateParams', 'PetService',
    function ($scope, $rootScope, $stateParams, PetService) {

        var petPerfil = {};
        $scope.petPerfil = petPerfil;
        console.log($stateParams.id);
        PetService.getPets($stateParams.id).on("value", function (snap) {

            petPerfil = snap.val();

        }, function (errorObject) {
            console.log("Erro na leitura do banco " + errorObject.code);
        });

    }]);
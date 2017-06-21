angular.module('adoteCtrls', []).controller('adoteCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'PetService',
    function ($scope, $stateParams, $state, $rootScope, PetService) {

        var pets = [];
        $scope.pets = pets;

        var usuario = $rootScope.usuario;

        PetService.getPetsRef().on("child_added", function (snap) {
            var key = snap.key;
            var obj = {"key": key, "val": snap.val()};
            pets.unshift(obj);
        });

        PetService.getPetsRef().on("child_removed", function (snap) {
          window.location.reload();
        });
        console.log(pets, 'adote');

        $scope.detalharPet = function (id) {
            $state.go('tabs.perfil/:id', {id: id});

        };
    }]);
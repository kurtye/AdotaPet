angular.module('adoteCtrls', []).controller('adoteCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'PetService', '$ionicLoading',
    function ($scope, $stateParams, $state, $rootScope, PetService, $ionicLoading) {

        $ionicLoading.show({
            template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>'
        });
        $scope.pets = [];
        PetService.getPetsRef().on("child_added", function (snap) {
            var key = snap.key;
            var obj = {"key": key, "val": snap.val()};
            //console.log(tumb);
            $scope.pets.unshift(obj);
            $ionicLoading.hide();

        });

        PetService.getPetsRef().on("child_removed", function (snap) {

            console.log(snap.val(), 'adadadas');

        });
        $scope.apply = function () {
            $scope.$apply();
        };

        $scope.detalharPet = function (id) {
            $state.go('tabs.perfil/:id', {id: id});

        };
    }]);

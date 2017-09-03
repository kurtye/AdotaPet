angular.module('adoteCtrls', []).controller('adoteCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'PetService', '$ionicLoading', 'ApoioService',
  function ($scope, $stateParams, $state, $rootScope, PetService, $ionicLoading, ApoioService) {

    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-assertive"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      duration: 6000
    });
    var log = function (data1, data2) {
      console.log(data1, data2);
    };

    $scope.$on('$ionicView.enter', function () {

      var pets = [];
      $scope.pets = pets;

      log('entrou na viewwwww')
      var filtros = ApoioService.getFiltros();
      PetService.getPetsRef().on("child_added", function (snap) {
        var key = snap.key;
        var val = snap.val();
        var obj = {"key": key, "val": snap.val()};

        if (filtros.sexo == "" || filtros.sexo == val.sexo) {
          if (filtros.outros && val.especie == "Outros" || filtros.canina && val.especie == "Canina" || filtros.felina && val.especie == "Felina") {
            if (val.estado == filtros.estado) {
              pets.unshift(obj);
            }
          }
        }

        $ionicLoading.hide();

      });

    });


    PetService.getPetsRef().on("child_removed", function (snap) {

      pets.forEach(function (item, index) {
        if (item.key == snap.key) {
          log(item, index)
          pets.splice(index, 1);
          $scope.$apply();
        }
      });

    });


    $scope.detalharPet = function (id) {
      $state.go('tabs.perfil/:id', {id: id});

    };

  }]);

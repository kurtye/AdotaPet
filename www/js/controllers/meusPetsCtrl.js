angular.module('meusPetsCtrls', []).controller('meusPetsCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'UsuarioService', 'PetService', '$ionicLoading',
  function ($scope, $rootScope, $stateParams, $state, UsuarioService, PetService, $ionicLoading) {

    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-assertive"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      duration: 6000
    });

    $scope.alterarPet = function (pet, key) {

      $state.go('tabs.addPet', {id: key});

    };

    $scope.usuario = UsuarioService.getUser() ? UsuarioService.getUser() : null;

    var usuario = $scope.usuario;

    PetService.getMeusPets(usuario.userId).on('value', function (snap) {
      $scope.myPets = snap.val();
      $scope.$apply();

    });

    PetService.getPetsAdotados(usuario.userId).on('value', function (snap) {
      $scope.adotados = snap.val();
      $ionicLoading.hide();
      $scope.$apply();

    });

    $scope.marcarAdotado = function (pet, key) {

      swal({
        title: 'Você tem certeza?',
        text: "O pet não ira mais aparecer na lista para adoção!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Confirmar!',
        closeOnConfirm: false
      }, function (isConfirm) {
        if (isConfirm === true) {
          PetService.marcarComoAdotado(pet, key);
          $state.go('tabs.meuspets');
          swal({
              title: 'Confirmado!',
              text: pet.nome + " Foi adotado",
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            }
          );
        }
      }); //function.
    };

    $scope.marcarDisponivel = function (pet, key) {

      swal({
        title: 'Você tem certeza?',
        text: "O pet ira aparecer novamente na lista para adoção!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'cancelar',
        confirmButtonText: 'Confirmar!',
        closeOnConfirm: false
      }, function (isConfirm) {
        if (isConfirm === true) {
          PetService.desmarcarAdotado(pet, key);
          $state.go('tabs.meuspets');
          swal({
              title: 'Confirmado!',
              text: pet.nome + " Retornou para a adoção",
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            }
          );
        }
      }); //function.
    };

  }]);

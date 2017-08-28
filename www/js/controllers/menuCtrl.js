angular.module('menuCtrls', [])
  .controller('menuCtrl', ['$scope', '$stateParams', '$rootScope', 'UsuarioService', '$state', '$ionicSideMenuDelegate',
    function ($scope, $stateParams, $rootScope, UsuarioService, $state, $ionicSideMenuDelegate) {


      $scope.usuario = UsuarioService.getUser() ? UsuarioService.getUser() : {"userId": 'default'};

      console.log($scope.usuario)

      $scope.fechar = function () {


        $state.go('tabs.adote');


      };

      $scope.addTexto = function (texto) {

        firebase.database().ref('relatarBugs/').push(texto)
        $scope.texto = {}

        swal({
            title: 'Obrigado',
            text: "Sua opinião é muito importante",
            type: 'success',
            showConfirmButton: false,
            timer: 1000
          }
        );


      }

      $scope.fecharMenu = function () {
        $ionicSideMenuDelegate.toggleLeft()

      }

      $scope.callbacks = function () {

        window.open('mailto:kurtyebsb@gmail.com', '_system');

      }

      $scope.rateApp = function () {
        AppRate.promptForRating(true);

      }

      $scope.doLogout = function () {
        localStorage.clear();
        $state.go('login');
        $ionicSideMenuDelegate.toggleLeft()
      };
    }]);

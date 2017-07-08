angular.module('menuCtrls', [])
  .controller('menuCtrl', ['$scope', '$stateParams', '$rootScope', 'UsuarioService', '$state','$ionicSideMenuDelegate',
    function ($scope, $stateParams, $rootScope, UsuarioService, $state, $ionicSideMenuDelegate) {


      $scope.usuario = UsuarioService.getUser() ? UsuarioService.getUser() : {"userId": 'default'};

      console.log($scope.usuario)

      $scope.fechar = function () {


        $state.go('tabs.adote');


      };




      $scope.doLogout = function () {
        localStorage.clear();
        $ionicSideMenuDelegate.toggleLeft();
        $state.go('login');
      };
    }]);

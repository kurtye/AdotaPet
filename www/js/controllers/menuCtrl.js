angular.module('menuCtrls', [])
    .controller('menuCtrl', ['$scope', '$stateParams', '$rootScope', 'UsuarioService', '$state',
        function ($scope, $stateParams, $rootScope, UsuarioService, $state) {


            $scope.usuario = UsuarioService.getUser() ? UsuarioService.getUser() : {"userId": 'default'};



            $scope.doLogout = function () {
                localStorage.clear();
                $state.go('login');
            };
        }]);

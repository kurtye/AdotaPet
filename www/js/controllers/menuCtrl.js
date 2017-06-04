angular.module('menuCtrls', [])
    .controller('menuCtrl', ['$scope', '$stateParams', '$rootScope', 'UsuarioService', '$state',
        function ($scope, $stateParams, $rootScope, UsuarioService, $state) {

            $scope.usuario = UsuarioService.getUser() ? UsuarioService.getUser() : {"userId": 'default'};

            var usuario = $scope.usuario;

            const db = firebase.database().ref();

            var myPets = db.child('adocao/pets').orderByChild('usuario').equalTo(usuario.userId);
            myPets.on('value', function (snap) {
                $scope.myPets = snap.val();
            });

            $scope.doLogout = function () {
                localStorage.clear();
                $state.go('login');
            };
        }]);

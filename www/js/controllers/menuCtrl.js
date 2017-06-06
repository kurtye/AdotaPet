angular.module('menuCtrls', [])
    .controller('menuCtrl', ['$scope', '$stateParams', '$rootScope', 'UsuarioService', '$state', '$ionicModal',
        function ($scope, $stateParams, $rootScope, UsuarioService, $state, $ionicModal) {

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $rootScope.modal = modal;
            });

            $scope.carregarModal = function (pet, key) {
                $rootScope.pet = pet;
                $rootScope.key = key;
                $scope.modal.show();
            };
            $scope.usuario = UsuarioService.getUser() ? UsuarioService.getUser() : {"userId": 'default'};

            var usuario = $scope.usuario;

            const db = firebase.database().ref();

            var myPets = db.child('adocao/pets').orderByChild('usuario').equalTo(usuario.userId);
            myPets.on('value', function (snap) {
                $scope.myPets = snap.val();
                //console.log(snap.val());
            });

            $scope.doLogout = function () {
                localStorage.clear();
                $state.go('login');
            };
        }]);

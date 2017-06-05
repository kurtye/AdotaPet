angular.module('menuCtrls', [])
    .controller('menuCtrl', ['$scope', '$stateParams', '$rootScope', 'UsuarioService', '$state', '$ionicModal',
        function ($scope, $stateParams, $rootScope, UsuarioService, $state, $ionicModal) {

           $ionicModal.fromTemplateUrl('templates/modal.html', {
               scope: $scope,
               animation: 'slide-in-up'
           }).then(function (modal) {
               $scope.modal = modal;
           });

           $scope.carregarModal = function (pet) {
               $rootScope.pet = pet;
               $scope.modal.show();
               console.log($rootScope.pet, 'rootscope');

           };
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

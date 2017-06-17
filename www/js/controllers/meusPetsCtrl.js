angular.module('meusPetsCtrls', []).controller('meusPetsCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'UsuarioService', '$ionicModal',
    function ($scope, $rootScope, $stateParams, $state, UsuarioService, $ionicModal) {

        $ionicModal.fromTemplateUrl('templates/modals/addPet.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.carregarModal = function (pet, key) {
            $rootScope.pet = pet;
            $rootScope.key = key;
            $rootScope.especie = pet.especie;
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

    }]);

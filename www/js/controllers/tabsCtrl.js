angular.module('tabsCtrls', []).controller('tabsCtrl', ['$scope', '$stateParams', '$state', 'UsuarioService', '$ionicModal',
    function ($scope, $stateParams, $state, UsuarioService, $ionicModal) {

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });


        $scope.fecharModal = function () {


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

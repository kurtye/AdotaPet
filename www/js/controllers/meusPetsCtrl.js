angular.module('meusPetsCtrls', []).controller('meusPetsCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'UsuarioService', 'PetService', '$ionicModal',
    function ($scope, $rootScope, $stateParams, $state, UsuarioService, PetService, $ionicModal) {

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

        $scope.usuario = UsuarioService.getUser() ? UsuarioService.getUser() : null;

        if(!$scope.usuario){
            window.reload();
        }
        var usuario = $scope.usuario;

        PetService.getMeusPets(usuario.userId).once('value').then(function (snap) {
            $scope.myPets = snap.val();
        });

        PetService.getPetsAdotados(usuario.userId).once('value').then(function (snap) {
            $scope.adotados = snap.val();
        });


        $scope.marcarAdotado = function (pet, key) {

            swal({
                title: 'Você tem certeza?',
                text: "O pet não ira mais aparecer na lista para adoção!",
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Não',
                confirmButtonText: 'Confirmar!',
                closeOnConfirm: false
            },function(isConfirm) {
                if (isConfirm === true) {
                    PetService.marcarComoAdotado(pet, key);
                    $state.go('tabs.meuspets');
                    swal(
                        'confirmado!',
                        pet.nome + ' adotado',
                        'success'
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
            },function(isConfirm) {
                if (isConfirm === true) {
                    PetService.desmarcarAdotado(pet, key);
                    $state.go('tabs.meuspets');
                    swal(
                        'confirmado!',
                        pet.nome + ' voltou para adoção',
                        'success'
                    );
                }
            }); //function.
        };

    }]);

angular.module('meusPetsCtrls', []).controller('meusPetsCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'UsuarioService', 'PetService',
    function ($scope, $rootScope, $stateParams, $state, UsuarioService, PetService) {


        $scope.alterarPet = function (pet, key) {

            $state.go('tabs.addPet', {id: key});

        };

        $scope.usuario = UsuarioService.getUser() ? UsuarioService.getUser() : null;

        if(!$scope.usuario){
            window.reload();
        }
        var usuario = $scope.usuario;

         PetService.getMeusPets(usuario.userId).on('value', function (snap) {
             $scope.myPets = snap.val();
        });

         PetService.getPetsAdotados(usuario.userId).on('value', function (snap) {
             $scope.adotados =  snap.val();
        });


        console.log($scope.myPets);
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

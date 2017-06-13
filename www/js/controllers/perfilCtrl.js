angular.module('perfilCtrls', []).controller('perfilCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'PetService', 'UsuarioService', 'ChatService', '$ionicModal',
    function ($scope, $state, $rootScope, $stateParams, PetService, UsuarioService, ChatService, $ionicModal) {

        var petKey = $stateParams.id;
        $scope.petKey = $stateParams.id;
        if(petKey){
            PetService.setPet(petKey);
        }

        var petPerfil = PetService.getPet();
        $scope.petPerfil = petPerfil;

        console.log(petPerfil);

        var UserLogado = UsuarioService.getUser();
        var user = UserLogado.userId;
        var postador;

        UsuarioService.verificarUsuario(petKey).once('value', function (snap) {
            postador = snap.val().usuario;
        });

        if (user == postador) {
            $scope.donoDaPostagem = true;
        } else {
            $scope.donoDaPostagem = false;
        }


        $scope.enviarMensagem = function (objPet, petKey) {

            var retorno = ChatService.setDados(objPet, petKey, null, 1);

            var dadosAgrupados = ChatService.getDadosAgrupados();
            $state.go('tabsController.conversa', {id: dadosAgrupados});

        };
    }]);
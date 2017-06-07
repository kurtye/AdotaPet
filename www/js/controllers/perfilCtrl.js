angular.module('perfilCtrls', []).controller('perfilCtrl', ['$scope','$state', '$rootScope', '$stateParams', 'PetService', 'UsuarioService', 'ChatService',
    function ($scope,  $state,  $rootScope, $stateParams, PetService, UsuarioService, ChatService) {

        var petPerfil = [];
        var petKey = $stateParams.id;
        $scope.petKey = $stateParams.id;
        $scope.petPerfil = petPerfil;
        console.log(petPerfil);

        PetService.getPets(petKey).once("value", function (snap) {

            petPerfil.push(snap.val());

        }, function (errorObject) {
            console.log("Erro na leitura do banco " + errorObject.code);
        });


        var UserLogado = UsuarioService.getUser();
        var user = UserLogado.userId;
        var postador;

        UsuarioService.verificarUsuario(petKey).once('value', function (snap) {
            postador = snap.val().usuario;
        });

        if (user == postador){
            $scope.donoDaPostagem = true;
        }else {
            $scope.donoDaPostagem =  false;
        }





        $scope.enviarMensagem = function (dono, petKey) {

            var retorno = ChatService.setDados(dono, petKey);

            $state.go('tabsController.conversa');

        };
    }]);
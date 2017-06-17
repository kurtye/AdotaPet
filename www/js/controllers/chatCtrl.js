angular.module('chatCtrls', []).controller('chatCtrl', ['$scope', '$rootScope', '$state', 'ChatService', 'UsuarioService', '$ionicModal',
    function ($scope, $rootScope, $state, ChatService, UsuarioService, $ionicModal) {


        var salasEnvios = ChatService.getSalasEnviadas();
        var salasRecebidas = ChatService.getSalasRecebidas();
        $scope.salasEnvios = salasEnvios;
        $scope.salasRecebidas = salasRecebidas;


        $scope.abrirChat = function (chat) {

            // O padrão é um objeto, a key do pet, e os dados agrupados.
            var retorno = ChatService.setDados(chat, chat.pet, chat.dono_interessado_pet);

            $state.go('tabsController.conversa', {id: chat.dono_interessado_pet, dono: chat.id_dono});
        }

    }]);

angular.module('chatCtrls', []).controller('chatCtrl', ['$scope', '$rootScope', '$state', 'ChatService', '$ionicLoading',
    function ($scope, $rootScope, $state, ChatService, $ionicLoading) {

        $ionicLoading.show({
            template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
            timer: 5000
        });

        var salasEnvios = [];
        ChatService.getSalasEnviadas().on('child_added', function (snap) {
            salasEnvios.unshift(snap.val());
            $ionicLoading.hide();
        });

        var salasRecebidas = [];
        ChatService.getSalasRecebidas().on('child_added', function (snap) {
            salasRecebidas.unshift(snap.val());
            $ionicLoading.hide();
        });
        $scope.salasEnvios = salasEnvios;
        $scope.salasRecebidas = salasRecebidas;


        console.log(salasRecebidas);
        $scope.abrirChat = function (chat) {

            // O padrão é um objeto, a key do pet, e os dados agrupados.
            var retorno = ChatService.setDados(chat, chat.pet, chat.dono_interessado_pet);

            $state.go('tabs.conversa', {id: chat.dono_interessado_pet, dono: chat.id_dono});
        };

    }]);

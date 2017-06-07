angular.module('conversaCtrls', []).controller('conversaCtrl', ['$scope', '$stateParams', 'UsuarioService', 'ChatService',
    function ($scope, $stateParams, UsuarioService, ChatService) {


        $scope.messages = [
            {userId: 'fTCTPF2Rj6Z4bWq5kvrwcaxvr3K2', text: 'iaeeeeeeeee', time: 100},
            {userId: 123, text: 'iaeeeeeeeee'},
            {userId: 'fTCTPF2Rj6Z4bWq5kvrwcaxvr3K2', text: 'iaeeeeeeeee'},
            {userId: 123, text: 'sdfdsfs'},
            {userId: 'fTCTPF2Rj6Z4bWq5kvrwcaxvr3K2', text: 'ddddd'},
            {userId: 'fTCTPF2Rj6Z4bWq5kvrwcaxvr3K2', text: 'ffffffff'},
            {userId: 123, text: 'gggggggggggg'},
            {userId: 'fTCTPF2Rj6Z4bWq5kvrwcaxvr3K2', text: 'ccccccccccccccccccccccccccccccc'}
        ];

        $scope.myId = UsuarioService.getUser().userId;

        $scope.enviarMensagem = function (msg) {

            var retorno = ChatService.enviarMensagem(msg);

        };
    }]);

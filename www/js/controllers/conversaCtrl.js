angular.module('conversaCtrls', []).controller('conversaCtrl', ['$scope', '$rootScope', '$state', 'UsuarioService', 'ChatService', '$ionicScrollDelegate', '$stateParams',
    function ($scope, $rootScope, $state, UsuarioService, ChatService, $ionicScrollDelegate, $stateParams) {

        $scope.msg = [];

        var messages = [];
        $scope.messages = messages;
        $scope.myId = UsuarioService.getUser().userId;
        var chaveChat = $stateParams.id;
        var dono = $stateParams.dono;



        ChatService.getMessages(chaveChat).on('child_added', function (snap) {
            messages.push(snap.val());
            $scope.$apply();
            $ionicScrollDelegate.resize();
            $ionicScrollDelegate.scrollBottom();
        });


        $scope.sendMessage = function (msg) {

            var retorno = ChatService.enviarMensagem(msg);
            $scope.msg = '';

        };

    }]);

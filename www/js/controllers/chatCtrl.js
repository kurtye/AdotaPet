angular.module('chatCtrls', []).controller('chatCtrl', ['$scope', '$rootScope', '$stateParams', 'ChatService',
  function ($scope, $rootScope, $stateParams, ChatService) {

    $scope.chats = ChatService.getMyChats();

    console.log($scope.chats);
  }]);

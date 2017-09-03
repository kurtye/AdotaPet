angular.module('instaPetCtrls', []).controller('instaPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'PetService', '$ionicLoading',
  function ($scope, $stateParams, $state, $rootScope, PetService, $ionicLoading) {

    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-assertive"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      duration: 6000
    });
    var instapets = [];
    $rootScope.instapets = instapets;

    var usuario = $rootScope.usuario;


    var db = firebase.database();
    var ref = db.ref("instapet/").orderByValue();

    ref.on("child_added", function (snapshot) {
      instapets.unshift(snapshot.val());
      $scope.$apply();
      $ionicLoading.hide();
    }, function (errorObject) {
      console.log("Erro na leitura do banco " + errorObject.code);
    });


    // contador de likes
    var likeCount = 10;


  }]);

angular.module('instaPetCtrls', []).controller('instaPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'PetService',
  function ($scope, $stateParams, $state, $rootScope, PetService) {

    var instapets = [];
    $rootScope.instapets = instapets;

    var usuario = $rootScope.usuario;



    var db = firebase.database();
    var ref = db.ref("instapet/").orderByValue();

    console.log(ref)

    ref.on("child_added", function (snapshot) {
      instapets.unshift(snapshot.val());

    }, function (errorObject) {
      console.log("Erro na leitura do banco " + errorObject.code);
    });


    // contador de likes
    var likeCount = 10;



  }]);

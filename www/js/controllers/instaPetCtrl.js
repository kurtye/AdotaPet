angular.module('instaPetCtrls', []).controller('instaPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'PetService', '$ionicLoading',
    function ($scope, $stateParams, $state, $rootScope, PetService, $ionicLoading) {

        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
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

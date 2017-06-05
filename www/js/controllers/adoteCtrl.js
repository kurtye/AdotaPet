angular.module('adoteCtrls', []).controller('adoteCtrl', ['$scope', '$stateParams', '$rootScope',
    function ($scope, $stateParams, $rootScope) {

        var pets = [];
        $rootScope.pets = pets;

        var usuario = $rootScope.usuario;


        var db = firebase.database();
        var ref = db.ref("adocao/pets/");

        ref.on("child_added", function (snapshot) {
            pets.unshift(snapshot.val());

        }, function (errorObject) {
            console.log("Erro na leitura do banco " + errorObject.code);
        });

        console.log(pets);

    }]);
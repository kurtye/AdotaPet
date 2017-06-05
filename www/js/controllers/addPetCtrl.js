angular.module('addPetCtrls', []).controller('addPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UsuarioService', '$ionicModal',
    function ($scope, $stateParams, $state, $rootScope, UsuarioService, $ionicModal) {

        $scope.imgURL = document.getElementById("files");

        //INICIO DO UPLOAD
        window.previewFile = function previewFile() {
            var storage = firebase.storage();

            var file = document.getElementById("files").files[0];
            console.log(file);

            var storageRef = firebase.storage().ref();

            //dynamically set reference to the file name
            var thisRef = storageRef.child('images/adocao/' + file.name);


            //put request upload file to firebase storage
            thisRef.put(file).then(function (snapshot) {
                var url = snapshot.downloadURL;


                document.getElementById('linkbox').innerHTML = '<img src="' + url + '" style=" width: 100px; " />';


                $scope.pet.imgURL = url;
                console.log(url);
            });

            //get request to get URL for uploaded file
            thisRef.getDownloadURL().then(function (url) {

                console.log(url);
            })

        };

        //var usuario = {};
        //var key;
        //UsuarioService.getUsuario().then(function (snap) {
        //    key = snap.key;
        //    usuario[snap.key] = snap.val();

        //});

        var user = UsuarioService.getUser();
        $rootScope.pet = {
            "usuario": user.userId
            //"nomeUsuario": user.displayName,
            //"email": user.email,
            //"fotoUsuario": user.imageUrl
        };

        $scope.addPet = function (pet) {
            console.log(pet);

            firebase.database().ref('adocao/pets/').push(pet);
            $state.go("tabsController.adote");
            alert('Cadastrado com Sucesso');

            $scope.pet = {}
        }

    }])
;

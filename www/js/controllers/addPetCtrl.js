angular.module('addPetCtrls', []).controller('addPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UsuarioService',
    function ($scope, $stateParams, $state, $rootScope, UsuarioService) {


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

        var usuario = UsuarioService.getUser() ? UsuarioService.getUser() : {"userId": 'whatever'};

        $scope.pet = {
            "usuario": usuario.uid,
            "nomeUsuario": usuario.displayName,
            "email": usuario.email,
            "fotoUsuario": usuario.photoURL
        };

        $scope.addPet = function (pet) {
            console.log(pet);
            firebase.database().ref('adocao/pets/').push(pet);
            $state.go("tabsController.adote");
            alert('Cadastrado com Sucesso');

            $scope.pet = {}
        }

    }]);

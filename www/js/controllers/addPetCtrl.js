angular.module('addPetCtrls', []).controller('addPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UsuarioService', 'PetService',
    function ($scope, $stateParams, $state, $rootScope, UsuarioService, PetService) {


        var racas = [];
        $rootScope.raca = racas;
        //console.log(racas);

        var db = firebase.database();
        var ref = db.ref("raca/");

        ref.on("child_added", function (snapshot) {
            racas.push(snapshot.val());

        }, function (errorObject) {
            console.log("Erro na leitura do banco " + errorObject.code);
        });

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



        var user = UsuarioService.getUser();
        $rootScope.pet = {
            "usuario": user.userId
        };


        $scope.addPet = function (pet) {
            var key = $rootScope.key;

            //CHAMANDO O METODO DA SERVICE PASSANDO O OBJETO DE PET PARA INSERIR NO BANCO.
            //SE TIVER A KEY A SERVICE VAI ALTERAR, SE NÃO ELA VAI INSERIR;
            PetService.setPet(pet, key);

            $scope.modal.hide;
            $state.go("tabsController.adote");

            swal({
                title: "Pet cadastrado com louvor",
                text: "Tomara que alguem adote",
                type: "success",
                showConfirmlButton: false,
                timer: 2000
            });
            $rootScope.pet = {};
            $rootScope.key = null;
            var key = null;
        };

    }]);
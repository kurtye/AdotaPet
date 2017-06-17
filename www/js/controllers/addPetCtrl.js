angular.module('addPetCtrls', []).controller('addPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UsuarioService', 'PetService', 'ApoioService',
    function ($scope, $stateParams, $state, $rootScope, UsuarioService, PetService, ApoioService) {

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
            "usuario": user.userId,
            "nomeUsuario": user.displayName,
            "email": user.email,
            "userFoto": user.imageUrl
        };


        $scope.addPet = function (pet) {
            var key = $rootScope.key;

            pet.dt_publicacao = Date.now();
            //CHAMANDO O METODO DA SERVICE PASSANDO O OBJETO DE PET PARA INSERIR NO BANCO.
            //SE TIVER A KEY A SERVICE VAI ALTERAR, SE NÃO ELA VAI INSERIR;
            PetService.updatePet(pet, key);

            $scope.modal.hide();
            $state.go("tabs.meuspets");

            swal({
                title: "Pet cadastrado com louvor",
                text: "Boa Sorte",
                type: "success",
                showConfirmlButton: false,
                timer: 2000
            });
            $rootScope.pet = {};
            $rootScope.key = null;
            var key = null;
        };

        $scope.fecharModal = function () {
            $rootScope.pet = {};
            $rootScope.key = null;
            $scope.modal.hide();
        };


        $scope.especies = ApoioService.especies;
        $scope.racas = [];
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa');

        if($rootScope.especie){
            $scope.racas = ApoioService.getRacas($rootScope.especie);

        };

        $scope.GetSelectedEspecie = function (selecionada) {
            var especie = selecionada;
            if(!especie){
                var key = $rootScope.especie;
            }else {
                var key = selecionada;
            }
            console.log(selecionada);
            $scope.racas = ApoioService.getRacas(key);
        };

    }]);
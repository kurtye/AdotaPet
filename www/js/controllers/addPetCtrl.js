angular.module('addPetCtrls', []).controller('addPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UsuarioService', 'PetService', 'ApoioService',
    function ($scope, $stateParams, $state, $rootScope, UsuarioService, PetService, ApoioService) {

        $scope.key = $stateParams.id;
        var key = $scope.key;
        if(key){
            PetService.setPet(key);
            $scope.pet = PetService.getPet();
        }
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
       // $scope.pet.user = {
       //     "id": user.userId,
       //     "nome": user.displayName,
       //     "email": user.email,
       //     "foto": user.imageUrl
       // };

        $scope.addPet = function (pet) {

            pet.dt_publicacao = Date.now();
            //CHAMANDO O METODO DA SERVICE PASSANDO O OBJETO DE PET PARA INSERIR NO BANCO.
            //SE TIVER A KEY A SERVICE VAI ALTERAR, SE NÃO ELA VAI INSERIR;
            console.log(pet);

            PetService.updatePet(pet, $scope.key);

            $state.go("tabs.meuspets");

            swal({
                title: pet.nome + " foi colocado em adoção",
                text: "Boa Sorte",
                type: "success",
                showConfirmlButton: false,
                timer: 2000
            });
        };


        $scope.especies = ApoioService.especies;
        $scope.racas = ApoioService.getRacas($rootScope.especie);

        $scope.GetSelectedEspecie = function (selecionada) {
            console.log(selecionada);
            $scope.racas = ApoioService.getRacas(selecionada);
        };

    }]);
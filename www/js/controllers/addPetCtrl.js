angular.module('addPetCtrls', []).controller('addPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UsuarioService', 'PetService',
    function ($scope, $stateParams, $state, $rootScope, UsuarioService, PetService) {

      // var e = document.getElementById("especie");
      // var selectedOp = e.options[e.selectedIndex].text;


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


                document.getElementById('linkbox').innerHTML = '<img src="' + url + '" style="width: 100%;background-repeat: no-repeat;background-position: 50%;border-radius: 50%;width: 100px;height: 100px;margin-top: 10px;" />';


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


      $scope.especie = {

        'Canina' : [
          "Sem Raça Definida (SRD)",
          "Afegão Hound",
          "Affenpinscher",
          "Airedale Terrier",
          "Akita",
          "American Staffordshire Terrier",
          "Basenji",
          "Basset Hound",
          "Beagle",
          "Bearded Collie",
          "Bedlington Terrier",
          "Bichon Frisé",
          "Bloodhound",
          "Bobtail",
          "Boiadeiro Australiano",
          "Boiadeiro Bernês",
          "Border Collie",
          "Border Terrier",
          "Borzoi",
          "Boston Terrier",
          "Boxer",
          "Buldogue",
          "Bull Terrier",
          "Bulmastife",
          "Cairn Terrier",
          "Cane Corso",
          "Cão de Água Português",
          "Cão de Crista Chinês",
          "Cavalier King Charles Spaniel",
          "Chesapeake Bay Retriever",
          "Chihuahua",
          "Chow Chow",
          "Cocker Spaniel",
          "Collie",
          "Coton de Tuléar",
          "Dachshund",
          "Dálmata",
          "Dandie Dinmont Terrier",
          "Doberman",
          "Dogo Argentino",
          "Dogue Alemão",
          "Fila Brasileiro",
          "Fox Terrier (Pelo Duro e Pelo Liso)",
          "Foxhound Inglês",
          "Galgo",
          "Golden Retriever",
          "Grande Boiadeiro Suiço",
          "Greyhound",
          "Grifo da Bélgica",
          "Husky Siberiano",
          "Jack Russell Terrier",
          "King Charles",
          "Komondor",
          "Labradoodle",
          "Labrador",
          "Lakeland Terrier",
          "Leonberger",
          "Lhasa Apso",
          "Lulu da Pomerânia",
          "Malamute do Alasca",
          "Maltês",
          "Mastife",
          "Mastim",
          "Norfolk Terrier",
          "Norwich Terrier",
          "Papillon",
          "Pastor Alemão",
          "Pastor Australiano",
          "Pinscher Miniatura",
          "Poodle",
          "Pug",
          "Rottweiler",
          "ShihTzu",
          "Silky Terrier",
          "Skye Terrier",
          "Staffordshire Bull Terrier",
          "Terra Nova",
          "Terrier Escocês",
          "Tosa",
          "Weimaraner",
          "Welsh Corgi (Cardigan)",
          "Welsh Corgi (Pembroke)",
          "West Highland White Terrier",
          "Whippet",
          "Xoloitzcuintli",
          "Yorkshire Terrier"

        ],
        'Felina':
          [
            "Sem Raça Definida (SRD)",
            "Persa",
            "Siamês",
            "Himalaia",
            "Maine Coon",
            "Angorá",
            "Siberiano",
            "Sphynx",
            "Burmese",
            "Ragdoll",
            "British Shorthair",
          ]
        ,
        'Outros': {
          'New South Wales': ['Sydney'],
          'Victoria': ['Melbourne']
        }
      };

      $scope.GetSelectedEspecie = function () {
        $scope.pet.especieSelecionado = document.getElementById("especie").value;
      };
      $scope.GetSelectedRaca = function () {
        $scope.pet.raca = document.getElementById("raca").value;
      };


    }]);

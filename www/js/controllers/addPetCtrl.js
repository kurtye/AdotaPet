angular.module('addPetCtrls', []).controller('addPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UsuarioService', 'PetService', 'ApoioService',
  function ($scope, $stateParams, $state, $rootScope, UsuarioService, PetService, ApoioService) {

    $scope.key = $stateParams.id;
    var key = $scope.key;
    $scope.pet = {};
    if (key) {
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
      if (key) {
        var thisRef = storageRef.child('images/adocao/' + key + '/' + file.name);
        console.log(thisRef);

      } else {
        var petKey = PetService.getNewPetKey().key;
        $scope.key = petKey;

        var thisRef = storageRef.child('images/adocao/' + petKey + '/' + file.name);

        firebase.database().ref().child('adocao/pets/' + petKey).set({default: '0'})


      }


      //put request upload file to firebase storage
      uploadTask = thisRef.put(file);

      uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        updateProgress(progress);
        //console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        if (progress == 100) {
          // quando estiver 100 upado a imagem, zera o loading pro circulo sumir;
          updateProgress(0);
        }
      }, function (error) {
        // Handle unsuccessful uploads
        console.log(error.code)
      }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;

        document.getElementById('linkbox').innerHTML = '<img src="' + downloadURL + '" style=" width: 100px; " />';
        $scope.pet.imgURL = downloadURL;
        console.log(downloadURL);
      });

      var updateProgress = function (percent) {
        console.log(percent);
        $scope.progress = percent;
        $scope.$apply();
      }

    };


    var user = UsuarioService.getUser();
    $scope.pet.user = {
      "id": user.userId,
      "nome": user.displayName,
      "email": user.email,
      "foto": user.imageUrl
    };

    $scope.addPet = function (pet) {

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

      $scope.pet = {};
    };


    $scope.especies = ApoioService.especies;
    $scope.racas = ApoioService.getRacas($rootScope.especie);

    $scope.GetSelectedEspecie = function (selecionada) {
      console.log(selecionada);
      $scope.racas = ApoioService.getRacas(selecionada);
    };

  }]);

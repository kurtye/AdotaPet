angular.module('addInstaCtrls', []).controller('addInstaCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UsuarioService', 'PetService',
  function ($scope, $stateParams, $state, $rootScope, UsuarioService, PetService) {







    var user = UsuarioService.getUser();
    console.log(UsuarioService.getUser());
    console.log(user.userId)

    $rootScope.instaPet = user.userId;
    console.log($rootScope.instaURL)


    console.log($scope.instaPet)




    $scope.imgURL = document.getElementById("files");

    //INICIO DO UPLOAD
    window.previewFile = function previewFile() {
      var storage = firebase.storage();

      var file = document.getElementById("files").files[0];
      console.log(file);

      var id = user.userId

      var storageRef = firebase.storage().ref();

      //dynamically set reference to the file name
      var thisRef = storageRef.child('images/instapet/'+id+'/' + file.name);


      //put request upload file to firebase storage
      thisRef.put(file).then(function (snapshot) {
        var url = snapshot.downloadURL;
        $scope.instaURL = url;


        document.getElementById('linkbox').innerHTML = '<img src="' + url + '" style="width: 100%;" />';



        $rootScope.instaURL = url;
        console.log(url);
        $scope.instaPet = {
          "usuario": user.userId,
          "nomeUsuario": user.displayName,
          "email": user.email,
          "fotoUsuario": user.imageUrl,
          "instaFoto" : url
        };

        console.log($scope.instaPet)
      });

      //get request to get URL for uploaded file
      thisRef.getDownloadURL().then(function (url) {

        console.log(url);
      })

    };

    $scope.addInstaPet = function (instaPet) {
      console.log(instaPet);
      firebase.database().ref('instapet/').push(instaPet)
      $state.go("tabsController.instaPet");
      swal('Publicado');

      $scope.instaPet = {}
    }





    var user = UsuarioService.getUser();
    $rootScope.pet = {
      "usuario": user.userId
    };



  }]);

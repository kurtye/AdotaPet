angular.module('addInstaCtrls', []).controller('addInstaCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UsuarioService', 'PetService',
  function ($scope, $stateParams, $state, $rootScope, UsuarioService) {


    var user = UsuarioService.getUser();

    $rootScope.instaPet = user.userId;


    $scope.imgURL = document.getElementById("files");

    //INICIO DO UPLOAD
    window.previewFile = function previewFile() {
      //var storage = firebase.storage();

      var file = document.getElementById("files").files[0];

      var id = user.userId;

      var storageRef = firebase.storage().ref();

      //dynamically set reference to the file name
      var thisRef = storageRef.child('images/instapet/' + id + '/' + file.name);


      //put request upload file to firebase storage
      thisRef.put(file).then(function (snapshot) {
        var url = snapshot.downloadURL;
        $scope.instaURL = url;

        document.getElementById('linkbox').innerHTML = '<img src="' + url + '" style="width: 100%;" />';

        $rootScope.instaURL = url;
        $scope.instaPet = {
          "usuario": user.userId,
          "nomeUsuario": user.displayName,
          "email": user.email,
          "fotoUsuario": user.imageUrl,
          "instaFoto": url
        };

      });

      //get request to get URL for uploaded file
      thisRef.getDownloadURL().then(function (url) {

      })

    };

    $scope.addInstaPet = function (instaPet) {
      firebase.database().ref('instapet/').push(instaPet);
      $state.go("tabs.instaPet");
      swal('Publicado');

      $scope.instaPet = {};

      $scope.$apply();
    };


    // var user = UsuarioService.getUser();
    $rootScope.pet = {
      "usuario": user.userId
    };


  }]);

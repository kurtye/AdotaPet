angular.module('app.controllers', [])

  .controller('adoteCtrl', ['$scope', '$stateParams', '$rootScope',
    function ($scope, $stateParams, $rootScope) {

    //Teste Upload ImG

      var auth = firebase.auth();
      var storageRef = firebase.storage().ref();
      function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var file = evt.target.files[0];
        var metadata = {
          'contentType': file.type
        };
        // Push to child path.
        // [START oncomplete]
        storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          console.log(snapshot.metadata);
          var url = snapshot.downloadURL;
          console.log('File available at', url);
          // [START_EXCLUDE]
          document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
          // [END_EXCLUDE]
        }).catch(function(error) {
          // [START onfailure]
          console.error('Upload failed:', error);
          // [END onfailure]
        });
        // [END oncomplete]
      }
      window.onload = function() {
        document.getElementById('file').addEventListener('change', handleFileSelect, false);
        document.getElementById('file').disabled = true;
        auth.onAuthStateChanged(function(user) {
          if (user) {
            console.log('Anonymous user signed-in.', user);
            document.getElementById('file').disabled = false;
          } else {
            console.log('There was no anonymous session. Creating a new anonymous user.');
            // Sign the user in anonymously since accessing Storage requires the user to be authorized.
            auth.signInAnonymously();
          }
        });
      }

      // FIm do teste

      var pets = [];
      $rootScope.pets = pets;

      var usuario = $rootScope.usuario;

      var db = firebase.database();
      var ref = db.ref("adocao/pets/");

      ref.on("child_added", function (snapshot) {
        pets.push(snapshot.val());

      }, function (errorObject) {
        console.log("Erro na leitura do banco " + errorObject.code);
      });

    }])


  .controller('desaparecidosCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('perfilCtrl', ['$scope', '$rootScope', '$stateParams',
    function ($scope, $rootScope, $stateParams) {

      $scope.petPerfil = $rootScope.pets[$stateParams.id];

    }])

  .controller('menuCtrl', ['$scope', '$stateParams', '$rootScope',
    function ($scope, $stateParams, $rootScope) {

      var usuario = $rootScope.usuario ? $rootScope.usuario : {"uid": "1lPGwfKdZ6WKRljCpP5wPJlKfsP2"};
      console.log($rootScope.usuario);
      const db = firebase.database().ref();

      const myPets = db.child('adocao/pets').orderByChild('usuario').equalTo(usuario.uid);

      myPets.on('value', function (snap) {
        $scope.myPets = snap.val();
      })



    }])

  .controller('loginCtrl', ['$scope', '$stateParams', '$document', '$state', '$rootScope',
    function ($scope, $stateParams, $document, $state, $rootScope) {

      // Verificar Login existente
      $scope.token = localStorage.getItem("token");
      if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
        $state.go("tabsController.adote");
      }
      // Fim da verificação de Token de login

      // Executar a ação de login quando o usuário envia o formulário de login
      $scope.doLogin = function (userLogin) {


        console.log(userLogin);

        if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {


          firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function () {

            var user = firebase.auth().currentUser;

            var name, email, photoUrl, uid;

            if (user.emailVerified) { //Checagem de verificação no email


              name = user.displayName;
              email = user.email;
              photoUrl = user.photoURL;
              uid = user.uid;

              $rootScope.usuario = user;

              //console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);

              localStorage.setItem("photo", photoUrl);
              $state.go("tabsController.adote");



            } else {

              alert("Você está cadastrado, faça a confirmação do seu email na caixa de entrada.")
              return false;

            } // fim da checagem de email


          }, function (error) {
            // Ocorreu um erro.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            if (errorCode === 'auth/invalid-email') {
              alert('Entre com um email válido.');
              return false;
            } else if (errorCode === 'auth/wrong-password') {
              alert('Senha Incorreta.');
              return false;
            } else if (errorCode === 'auth/argument-error') {
              alert('erro na senha.');
              return false;
            } else if (errorCode === 'auth/user-not-found') {
              alert('Usuário não encontrado.');
              return false;
            } else if (errorCode === 'auth/too-many-requests') {
              alert('Falha no login, tente mais tarde.');
              return false;
            } else if (errorCode === 'auth/network-request-failed') {
              alert('Tempo de resposta, tente mais tarde.');
              return false;
            } else {
              alert(errorMessage);
              return false;
            }
          });


        } else {

          alert('Entre com seu email e senha');
          return false;

        }//fim check servidor usuario e senha


      };// fim $scope.doLogin()


      // Login com Google

      var provider = new firebase.auth.GoogleAuthProvider();

      $scope.doLoginGoogle = function (userLoginGoogle) {

        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          var photoURL = result.photo;
          var user = result.user;
          $scope.token = token;
          $scope.photoURL = photo;
          $scope.user = user;
          console.log($scope.user);
          localStorage.setItem("token", $scope.token);
          localStorage.setItem("photoURL", $scope.photoURL);
          localStorage.setItem("user", $scope.user);




          // The signed-in user info.
          var user = result.user;
          // ...

          $rootScope.usuario = user;


          $state.go("tabsController.adote");
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...

        });

      }//Fim do login com Google Signin

      // Login com Facebook


      // Recuperar dados com login do facebook
      // provider.addScope('user_name');
      // provider.addScope('email');
      // provider.addScope('profile_photo');


      $scope.doLoginFacebook = function (userLoginFacebook) {

        var provider = new firebase.auth.FacebookAuthProvider();


        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...

          $rootScope.usuario = user;

          $state.go("tabsController.adote");

        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });

      }


      // Fim do login com Facebook


    }])

  .controller('filtrosCtrl', ['$scope', '$stateParams',

    function ($scope, $stateParams) {


    }])

  .controller('addPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope',


    function ($scope, $stateParams, $state, $rootScope) {

      var usuario = $rootScope.usuario;
      console.log($rootScope.usuario);
      $scope.pet = {"usuario": usuario.uid};

      $scope.addPet = function (pet) {

        firebase.database().ref('adocao/pets/').push(pet)


        $state.go("tabsController.adote");
        alert('Cadastrado com Sucesso');

        $scope.pet = {}
      }


    }])


  .controller('signupController', ['$scope', '$stateParams', '$document',

    function ($scope, $stateParams, $document) {

      $scope.doSignup = function (userSignup) {


        if ($document[0].getElementById("cuser_name").value != "" && $document[0].getElementById("cuser_pass").value != "") {


          firebase.auth().createUserWithEmailAndPassword(userSignup.cusername, userSignup.cpassword).then(function () {
            // Sign-In successful.
            //console.log("Signup successful");

            var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(function (result) {
              console.log(result)
            }, function (error) {
              console.log(error)
            });

            user.updateProfile({
              displayName: userSignup.displayname,
              photoURL: userSignup.photoprofile
            }).then(function () {
              // Update successful.
              $state.go("login");
            }, function (error) {
              // An error happened.
              console.log(error);
            });
            alert("Sucesso,verifique seu email e confirme")
            return false;


          }, function (error) {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);

            if (errorCode === 'auth/weak-password') {
              alert('Senha está fraca, escolha uma senha mais segura.');
              return false;
            } else if (errorCode === 'auth/email-already-in-use') {
              alert('O email já está sendo usado.');
              return false;
            }


          });


        } else {

          alert('Entre com email e senha');
          return false;

        }//end check client username password


      };// end $scope.doSignup()


    }])






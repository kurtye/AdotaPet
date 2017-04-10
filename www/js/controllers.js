angular.module('app.controllers', [])

  .controller('adoteCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

      var db = firebase.database();
      var ref = db.ref("user/1");

      ref.on("value", function (snapshot) {

        $scope.pets = snapshot.val();

      }, function (errorObject) {
        console.log("Erro na leitura do banco " + errorObject.code);
      });

    }])

  .controller('desaparecidosCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('perfilCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('menuCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('loginCtrl', ['$scope', '$stateParams', '$document', '$state',
    function ($scope, $stateParams, $document, $state) {

      // Executar a ação de login quando o usuário envia o formulário de login
      $scope.doLogin = function (userLogin) {


        console.log(userLogin);

        if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {


          firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function () {

            var user = firebase.auth().currentUser;

            var name, email, photoUrl, uid;

            if (user.emailVerified) { //Checagem de verificação no email

              console.log("Email Verificado");
              $state.go("tabsController.adote");

              name = user.displayName;
              email = user.email;
              photoUrl = user.photoURL;
              uid = user.uid;

              //console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);

              localStorage.setItem("photo", photoUrl);

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
          // The signed-in user info.
          var user = result.user;
          // ...

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


          alert('Cadastrado com Sucesso');
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

  .controller('addPetCtrl', ['$scope', '$stateParams', '$state',


    function ($scope, $stateParams, $state) {


      $scope.pet = {};

      $scope.addPet = function (pet) {

        firebase.database().ref('user/1').push(pet)
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






angular.module('app.controllers', ['ionic.cloud', 'ionic.native'])

  .controller('adoteCtrl', ['$scope', '$stateParams', '$rootScope',
    function ($scope, $stateParams, $rootScope) {

      var pets = [];
      $rootScope.pets = pets;

      var usuario = $rootScope.usuario;


      var db = firebase.database();
      var ref = db.ref("adocao/pets/").orderByValue();

      ref.on("child_added", function (snapshot) {
        pets.unshift(snapshot.val());

      }, function (errorObject) {
        console.log("Erro na leitura do banco " + errorObject.code);
      });


    }])

  .controller('favoritosCtrl', ['$scope', '$stateParams',

    function ($scope, $stateParams) {


    }])

  .controller('desaparecidosCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('perfilCtrl', ['$scope', '$rootScope', '$stateParams',
    function ($scope, $rootScope, $stateParams) {

      $scope.petPerfil = $rootScope.pets[$stateParams.id];

      var usuarioLogado = localStorage.getItem('uid');
      var usuarioPublicacao =  $scope.petPerfil.usuario;

      $scope.verificarUser = function () {

        if(usuarioLogado == usuarioPublicacao){
          return true;
        }
        return false;
      }



    }])

  .controller('menuCtrl', ['$scope', '$stateParams', '$rootScope', '$window', '$ionicHistory','$state',
    function ($scope, $stateParams, $rootScope, $window, $ionicHistory, $state) {


      var CurrentUser = localStorage.getItem('uid');
      $scope.UserPhoto = localStorage.getItem('photo');

      const db = firebase.database().ref();
      const myPets = db.child('adocao/pets').orderByChild('usuario').equalTo(CurrentUser);

      myPets.on('value', function (snap) {
        $scope.myPets = snap.val();
      })

      $scope.doLogout = function(){
        $window.localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $state.go('login')
      };


    }])

  .controller('loginCtrl', ['$scope', '$stateParams', '$document', '$rootScope', '$state', '$ionicGoogleAuth',
    '$ionicLoading', '$cordovaGooglePlus', '$ionicUser', '$http', 'UserService', '$q', '$ionicFacebookAuth', '$ionicAuth',
    'UserServiceGoogle', '$ionicSideMenuDelegate',

    function ($scope, $stateParams, $document, $rootScope, $state, $ionicGoogleAuth, $ionicLoading,
              $cordovaGooglePlus, $ionicUser, $http, UserService, $q, $ionicFacebookAuth,  $ionicAuth, UserServiceGoogle,
              $ionicSideMenuDelegate
               ) {

     //  Teste manter usuario
     //
     //
     //
      var manterUsuario = localStorage.getItem('starter_facebook_user')

      console.log(manterUsuario)

     if(manterUsuario != null ){

       var user = UserService.getUser('facebook');
       $rootScope.usuario = user;

       $state.go("tabsController.adote")
       console.log($ionicAuth)



       }else {
       $state.go("login")
     };
     //
     //
     //  // Fim do teste

      // $ionicSideMenuDelegate.canDragContent(false)



      // Executar a ação de login quando o usuário envia o formulário de login
      $scope.doLogin = function (userLogin) {




        if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {


          firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function () {

            var user = firebase.auth().currentUser;

            var name, email, photoUrl, uid;


            if (user.emailVerified) { //Checagem de verificação no email


              name = user.displayName;
              email = user.email;
              photoUrl = user.photoURL;
              uid = user.uid;

              localStorage.setItem("uid", user.uid);
              console.log(user.uid);



              $rootScope.usuario = user;
              $rootScope.photoProfile = photoUrl;

              console.log(name + "<>" + email + "<>" + photoUrl + "<>" + uid);

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


      // Login com Google Nativo


      $scope.doLoginGoogle = function () {

        window.plugins.googleplus.login(
          {
            'auth': {
              'google': {
                'scopes': 'https://www.googleapis.com/auth/plus.me',
                'offline': false,
                'webClientId': '908321839770-i7ri4c8f42h13i87cbnup9s1krnm22fs.apps.googleusercontent.com'
              }
            }
          },


          function (user) {

            var name, email, imageUrl, uid, idToken;




            if (user != null) {
              console.debug(user);
              name = user.displayName;
              email = user.email;
              imageUrl = user.imageUrl;
              uid = user.userId;
              idToken = user.idToken;
              // The user's ID, unique to the Firebase project. Do NOT use
              // this value to authenticate with your backend server, if

              // you have one. Use User.getToken() instead.




              sessionStorage.setItem("name", user.displayName)
              sessionStorage.setItem("email", user.email)
              sessionStorage.setItem("uid", user.userId)
              sessionStorage.setItem("imageUrl", user.imageUrl)
              localStorage.setItem("uid", user.userId)
              localStorage.setItem("photo", user.imageUrl)

              firebase.database().ref('usuarios/' + user.userId).set(user);


              $state.go("tabsController.adote");

              $rootScope.usuario = user;


            }


          },
          function (msg) {
            ;
            console.debug(msg);
          }
        );
      }


      // versão WEB (USAR EM DESENVOLVIMENTO e DELETAR APÓS PRODUÇÃO)

      //
      //  firebase.auth.sigInWithPopUp(provider).then(function (result) {
      //
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //
      //   var token = result.credential.accessToken
      //
      //   var user = firebase.auth().currentUser;
      //   if ($ionicAuth.isAuthenticated()) {
      //     $state.go("tabsController.adote")
      //   }
      //
      //   if (user != null) {
      //     user.providerData.forEach(function (profile) {
      //       console.log("Sign-in provider: " + profile.providerId);
      //       console.log("  Provider-specific UID: " + profile.uid);
      //       console.log("  Name: " + profile.displayName);
      //       console.log("  Email: " + profile.email);
      //       console.log("  Photo URL: " + profile.photoURL);
      //     });
      //   }
      //
      //    firebase.auth().onAuthStateChanged(function (user) {
      //      if (!user) {
      //        $state.go("tabsController.adote")
      //    }
      //  });
      //
      //
      //   var user = firebase.auth().currentUser;
      //   var name, email, photoUrl, uid;
      //
      //   if (user != null) {
      //     name = user.displayName;
      //     email = user.email;
      //     photoUrl = user.photoURL;
      //     uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
      //                      // this value to authenticate with your backend server, if
      //                      // you have one. Use User.getToken() instead.
      //
      //   }
      //
      //   sessionStorage.setItem("name", user.displayName)
      //   sessionStorage.setItem("email", user.email)
      //   sessionStorage.setItem("uid", user.uid)
      //   sessionStorage.setItem("photoUrl", user.photoURL)
      //
      //    $rootScope.usuario = user;
      //   $state.go("tabsController.adote")
      //
      //
      //
      //
      //
      // }).catch(function (error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // The email of the user's account used.
      //   var email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
      //   // ...
      //
      // });

      //Fim do login com Google Signin



      // Login com FACEBOOK




      console.log($ionicUser);


      var fbLoginSuccess = function (response) {
        if (!response.authResponse) {
          fbLoginError("Cannot find the authResponse");
          return;
        }

        var authResponse = response.authResponse;


        getFacebookProfileInfo(authResponse)
          .then(function (profileInfo) {
            // dados do usuário no armazenamento local
            UserService.setUser({
              authResponse: authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
            });

            $ionicLoading.hide();
            $state.go("tabsController.adote");


          }, function (fail) {
            // Falha em obter Profile info
            console.log('profile info fail', fail);
          });
      };

      // Este é o callback de falha do método de login

      var fbLoginError = function (error) {
        console.log('fbLoginError', error);
        $ionicLoading.hide();
      };

      // Este método é para obter as informações de perfil do usuário do facebook api
      var getFacebookProfileInfo = function (authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
          function (response) {
            console.log(response);
            info.resolve(response);
          },
          function (response) {
            console.log(response);
            info.reject(response);
          }
        );
        return info.promise;
        console.log(info.promisse)
      };

      //Este método é executado quando o usuário pressiona o botão "Login with facebook"
      $scope.facebookSignIn = function () {
        facebookConnectPlugin.getLoginStatus(function (success) {
          if (success.status === 'connected') {

            $ionicFacebookAuth.login().then(
              function (response) {
                console.log('response ' + response);
                $state.go("tabsController.adote");

                localStorage.setItem("uid", profileInfo.id)
                localStorage.setItem("photo", profileInfo.picture)

                firebase.database().ref('usuarios/' + user.userId).set(info.promise);

              })
            // O usuário efetuou login e autenticou seu aplicativo e o response.authResponse fornece
            // o ID do usuário, um token de acesso válido, um pedido assinado ea hora em que o token de acesso
            // e cada solicitação assinada expiram
            console.log('getLoginStatus', success.status);
            var user = UserService.getUser('facebook');
            $rootScope.usuario = user;
            // Verifique se o usuário está salvo




            if (!user.userID) {
              getFacebookProfileInfo(success.authResponse)
                .then(function (profileInfo) {
                  // Salvando dados no localStorage
                  UserService.setUser({
                    authResponse: success.authResponse,
                    userID: profileInfo.id,
                    name: profileInfo.name,
                    email: profileInfo.email,
                    picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"

                  });

                  $rootScope.usuario = UserService;






                  $state.go("tabsController.adote");
                }, function (fail) {
                  // Fail get profile info
                  console.log('profile info fail', fail);
                });
            } else {
              $state.go("tabsController.adote");
            }
          } else {
            // If (success.status === 'not_authorized') o usuário está conectado ao Facebook,
            // mas não autenticou seu aplicativo
            // Se a pessoa não estiver conectado ao Facebook,
            // então não temos certeza se eles estiverem conectados a este aplicativo ou não.

            console.log('getLoginStatus', success.status);


            $ionicLoading.show({
              template: 'Logando...'
            });

            // Pergunte as permissões do profile Facebook
            // Lista de permissões: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
          }
        });


        // VERSÃO WEB
        //
        //   var provider = new firebase.auth.FacebookAuthProvider();
        //
        //
        //   firebase.auth().signInWithPopup(provider).then(function (result) {
        //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //     var token = result.credential.accessToken;
        //     // The signed-in user info.
        //     var user = result.user;
        //     // ...
        //
        //     $rootScope.usuario = user;
        //
        //
        //     $state.go("tabsController.adote");
        //
        //   }).catch(function (error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     // The firebase.auth.AuthCredential type that was used.
        //     var credential = error.credential;
        //     // ...
        //   });
        //
        // }

      }
      // Fim do login com Facebook


    }])

  .controller('filtrosCtrl', ['$scope', '$stateParams',

    function ($scope, $stateParams) {


    }])

  .controller('addPetCtrl', ['$scope', '$stateParams', '$state', '$rootScope',


    function ($scope, $stateParams, $state, $rootScope) {

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

      }
      //FIM DO UPLOAD

      var usuario = $rootScope.usuario;

      console.log($rootScope.usuario);


      $scope.pet = {
        "usuario": usuario.userId,
        "nomeUsuario": usuario.displayName,
        "email": usuario.email,
        "fotoUsuario": usuario.imageUrl
      };

      $scope.addPet = function (pet) {
        console.log(pet);
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






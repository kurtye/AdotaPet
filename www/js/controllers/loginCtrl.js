angular.module('loginCtrls', ['ionic.cloud', 'ionic.native'])
    .controller('loginCtrl', ['$scope', '$stateParams', '$document', '$rootScope', '$state', '$ionicLoading', '$http',
      'UsuarioService', '$q',
      '$ionicFacebookAuth', '$ionicGoogleAuth', '$cordovaGooglePlus',
        function ($scope, $stateParams, $document, $rootScope, $state, $ionicLoading, $http,
                  UsuarioService, $q,
                  $ionicFacebookAuth, $ionicGoogleAuth, $cordovaGooglePlus) {


            // Executar a ação de login quando o usuário envia o formulário de login

            var checarLogin = UsuarioService.getUser();
            var empty = true;
            for (var p in checarLogin) {
                if (checarLogin.hasOwnProperty(p)) {
                    empty = false;
                    break;
                }
            }


            if (empty == false) {
                $state.go('tabs.adote');


            }
            else {
                $state.go('login');
            }
            ;

            $scope.doLogin = function (userLogin) {


                if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {


                    firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function () {

                        var user = firebase.auth().currentUser;

                        var name, email, photoUrl, uid;


                        if (user.emailVerified) { //Checagem de verificação no email



                            // name = user.displayName;
                            // email = user.email;
                            // photoUrl = user.photoURL;
                            // uid = user.uid;


                            // UsuarioService.updateUser({
                            //     "displayName": user.displayName,
                            //     "email": user.email,
                            //     "imageUrl": user.photoURL,
                            //     "userId": user.uid,
                            //
                            // });


                            console.log(user)

                            $rootScope.usuario = user;
                            $rootScope.photoProfile = photoUrl;

                          $state.go("tabs.adote");






                        } else {

                            alert("Você está cadastrado, faça a confirmação do seu email na caixa de entrada.")
                            return false;

                        } // fim da checagem de email


                    }, function (error) {
                        // Ocorreu um erro.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/invalid-email') {
                            alert('Entre com um email válido.');
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



          //GOOGLE login Nativo

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

                  $state.go("tabs.adote");
                  console.debug(user);

                  name = user.displayName;
                  email = user.email;
                  imageUrl = user.imageUrl;
                  uid = user.userId;
                  idToken = user.idToken;
                  // The user's ID, unique to the Firebase project. Do NOT use
                  // this value to authenticate with your backend server, if

                  // you have one. Use User.getToken() instead.

                  // firebase.database().ref('usuarios/' + user.userId).set(user);

                  UsuarioService.setUser({
                    "displayName": user.displayName,
                    "email": user.email,
                    "imageUrl": user.imageUrl,
                    "userId": user.userId,
                    // "state": profileInfo.location.location.state,
                    // "location" : profileInfo.location.location


                  });


                  $state.go("tabs.adote");

                }
                $state.go("tabs.adote");


              },
              function (msg) {
                console.debug(msg);
              }
            );
          }


          //GOOGLE login Nativo Fim


            // Login com Google WEB


            // $scope.doLoginGoogle = function () {
            //
            //     var provider = new firebase.auth.GoogleAuthProvider();
            //
            //
            //     firebase.auth().signInWithPopup(provider).then(function (result) {
            //
            //         // This gives you a Google Access Token. You can use it to access the Google API.
            //
            //         var token = result.credential.accessToken
            //
            //         var user = firebase.auth().currentUser;
            //
            //
            //         if (user != null) {
            //             user.providerData.forEach(function (profile) {
            //                 // console.log("Sign-in provider: " + profile.providerId);
            //                 // console.log("  Provider-specific UID: " + profile.uid);
            //                 // console.log("  Name: " + profile.displayName);
            //                 // console.log("  Email: " + profile.email);
            //                 // console.log("  Photo URL: " + profile.photoURL);
            //             });
            //         }
            //
            //         firebase.auth().onAuthStateChanged(function (user) {
            //             if (!user) {
            //                 $state.go("tabs.adote")
            //             }
            //         });
            //
            //
            //         var user = firebase.auth().currentUser;
            //         var name, email, photoUrl, uid;
            //
            //         if (user != null) {
            //             UsuarioService.setUser({
            //                 "displayName": user.displayName,
            //                 "email": user.email,
            //                 "imageUrl": user.photoURL,
            //                 "userId": user.uid
            //             });  // The user's ID, unique to the Firebase project. Do NOT use
            //             // this value to authenticate with your backend server, if
            //             // you have one. Use User.getToken() instead.
            //
            //         }
            //
            //         sessionStorage.setItem("name", user.displayName)
            //         sessionStorage.setItem("email", user.email)
            //         sessionStorage.setItem("uid", user.uid)
            //         sessionStorage.setItem("photoUrl", user.photoURL)
            //
            //         $rootScope.usuario = user;
            //         $state.go("tabs.adote")
            //
            //
            //     }).catch(function (error) {
            //         // Handle Errors here.
            //         var errorCode = error.code;
            //         var errorMessage = error.message;
            //         // The email of the user's account used.
            //         var email = error.email;
            //         // The firebase.auth.AuthCredential type that was used.
            //         var credential = error.credential;
            //         // ...
            //
            //     });
            //
            // };// Fim do login com Google Signin
//
//
//
//
            //  //FACEBOOK LOGIN WEB
//
            //  $scope.facebookSignIn = function () {
//
            //      var provider = new firebase.auth.FacebookAuthProvider();
//
//
            //      firebase.auth().signInWithPopup(provider).then(function (result) {
            //          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            //          var token = result.credential.accessToken;
            //          // The signed-in user info.
            //          var user = result.user;
//
            //          if (user != null) {
            //              user.providerData.forEach(function (profile) {
            //                 // console.log("Sign-in provider: " + profile.providerId);
            //                 // console.log("  Provider-specific UID: " + profile.uid);
            //                 // console.log("  Name: " + profile.displayName);
            //                 // console.log("  Email: " + profile.email);
            //                 // console.log("  Photo URL: " + profile.photoURL);
            //              });
            //          }
//
            //          firebase.auth().onAuthStateChanged(function (user) {
            //              if (!user) {
            //                  $state.go("tabs.adote")
            //              }
            //          });
//
//
            //          var user = firebase.auth().currentUser;
            //          var name, email, photoUrl, uid;
//
            //          if (user != null) {
            //              UsuarioService.setUser({
            //                  "displayName": user.displayName,
            //                  "email": user.email,
            //                  "imageUrl": user.photoURL,
            //                  "userId": user.uid
            //              });  // The user's ID, unique to the Firebase project. Do NOT use
            //              // this value to authenticate with your backend server, if
            //              // you have one. Use User.getToken() instead.
//
            //          }
//
//
            //          $state.go("tabs.adote")
//
//
            //      }).catch(function (error) {
            //          // Handle Errors here.
            //          var errorCode = error.code;
            //          var errorMessage = error.message;
            //          // The email of the user's account used.
            //          var email = error.email;
            //          // The firebase.auth.AuthCredential type that was used.
            //          var credential = error.credential;
            //          // ...
            //      });
//
            //  }

            //FIM DO FACEBOOK LOGIN WEB


            // FACEBOOK LOGIN NATIVO


            var fbLoginSuccess = function (response) {
                if (!response.authResponse) {
                    fbLoginError("Cannot find the authResponse");
                    return;
                }

                var authResponse = response.authResponse;

                getFacebookProfileInfo(authResponse)
                    .then(function (profileInfo) {
                        // For the purpose of this example I will store user data on local storage
                        UsuarioService.setUser({

                            authResponse: authResponse,
                            userID: profileInfo.id,
                            name: profileInfo.name,
                            email: profileInfo.email,
                          city: profileInfo.location,
                            picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"


                        });

                        $ionicLoading.hide();



                      $state.go('tabs.adote');
                        console.log(profileInfo)


                    }, function (fail) {
                        // Fail get profile info
                        console.log('profile info fail', fail);
                    });
            }
            // This is the fail callback from the login method
            var fbLoginError = function (error) {
                console.log('fbLoginError', error);
                $ionicLoading.hide();
            };

            // This method is to get the user profile info from the facebook api
            var getFacebookProfileInfo = function (authResponse) {
                var info = $q.defer();

                facebookConnectPlugin.api('/me?fields=email,location{location},name&access_token=' + authResponse.accessToken, null,
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
            };

            //This method is executed when the user press the "Login with facebook" button
            $scope.facebookSignIn = function () {

                facebookConnectPlugin.getLoginStatus(function (success) {
                    if (success.status === 'connected') {

                        // $ionicFacebookAuth.login().then(
                        //     function (response) {
                        //
                        //         console.log('response ' + response);
                        //       // $state.go("tabs.adote");
                        //
                        //     });

                        // The user is logged in and has authenticated your app, and response.authResponse supplies
                        // the user's ID, a valid access token, a signed request, and the time the access token
                        // and signed request each expire

                        // console.log('getLoginStatus', success.status);
                        var user = UsuarioService.getUser();


                        $rootScope.usuario = user;
                        // Check if we have our user saved


                        if (!user.userId) {
                            getFacebookProfileInfo(success.authResponse)
                                .then(function (profileInfo) {
                                    // For the purpose of this example I will store user data on local storage
                                    UsuarioService.setUser({
                                        "displayName": profileInfo.name,
                                        "email": profileInfo.email,
                                        "imageUrl": "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large",
                                        "userId": profileInfo.id,
                                      "state": profileInfo.location.location.state,
                                      "location" : profileInfo.location.location


                                    });



                                    $state.go("tabs.adote");
                                }, function (fail) {
                                    // Fail get profile info
                                    console.log('profile info fail', fail);
                                });
                        } else {
                            $state.go("tabs.adote");
                        }
                    } else {
                        // If (success.status === 'not_authorized') the user is logged in to Facebook,
                        // but has not authenticated your app
                        // Else the person is not logged into Facebook,
                        // so we're not sure if they are logged into this app or not.

                        console.log('getLoginStatus', success.status);


                        $ionicLoading.show({
                            template: 'Logando...'

                        });

                        // Ask the permissions you need. You can learn more about
                        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                        facebookConnectPlugin.login(['email', 'public_profile','user_location'], fbLoginSuccess, fbLoginError);
                      console.log('response ' + response);
                      console.log(user_location)
                      $state.go("tabs.adote");
                    }
                });
            };
            // Fim do login com Facebook


        }]);





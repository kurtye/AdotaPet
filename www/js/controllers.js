angular.module('app.controllers', [])

    .controller('adoteCtrl', ['$scope', '$stateParams', '$rootScope',
        function ($scope, $stateParams, $rootScope) {

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
                            $rootScope.photoProfile = photoUrl;

                            console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);

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


                 var token = result.credential.accessToken
                // var photoURL = result.photo




                var user = firebase.auth().currentUser;

                if (user != null) {
                  user.providerData.forEach(function (profile) {
                    console.log("Sign-in provider: "+profile.providerId);
                    console.log("  Provider-specific UID: "+profile.uid);
                    console.log("  Name: "+profile.displayName);
                    console.log("  Email: "+profile.email);
                    console.log("  Photo URL: "+profile.photoURL);
                  });
                }


                var user = firebase.auth().currentUser;
                var name, email, photoUrl, uid;

                if (user != null) {
                  name = user.displayName;
                  email = user.email;
                  photoUrl = user.photoURL;
                  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                                   // this value to authenticate with your backend server, if
                                   // you have one. Use User.getToken() instead.
                }


                // $scope.token = token
                // $scope.photoURL = photo
                // $scope.user = user;

                sessionStorage.setItem("name", user.displayName)
                sessionStorage.setItem("email", user.email)
                sessionStorage.setItem("uid", user.uid)
                sessionStorage.setItem("photoUrl", user.photoURL)



                $state.go("tabsController.adote")


                    $rootScope.usuario = user;



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






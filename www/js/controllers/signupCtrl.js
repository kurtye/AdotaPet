angular.module('signupCtrls', []).controller('signupCtrl', ['$scope', '$stateParams', '$document', '$state', 'UsuarioService',
  '$rootScope',
    function ($scope, $stateParams, $document, $state, UsuarioService, $rootScope) {



      $scope.imgURL = document.getElementById("files");




      //INICIO DO UPLOAD
      window.previewFile = function previewFile() {
        var storage = firebase.storage();

        var file = document.getElementById("files").files[0];
        console.log(file);

        var storageRef = firebase.storage().ref();

        //dynamically set reference to the file name

          var thisRef = storageRef.child('images/users/' + file.name);



        //put request upload file to firebase storage
        thisRef.put(file).then(function (snapshot) {
          var url = snapshot.downloadURL;

          document.getElementById('linkbox').innerHTML = '<img src="' + url + '" style=" width: 100px; " />';

          document.getElementById("photo_profile").value = url;

          console.log(url);
        });

        //get request to get URL for uploaded file
        thisRef.getDownloadURL().then(function (url) {



          console.log(url);

        })


      };




        $scope.doSignup = function (userSignup) {






            if ($document[0].getElementById("cuser_name").value != "" && $document[0].getElementById("cuser_pass").value != "") {


                firebase.auth().createUserWithEmailAndPassword(userSignup.cusername, userSignup.cpassword).then(function () {

                    //console.log("Signup successful");

                    var user = firebase.auth().currentUser;

                    user.sendEmailVerification().then(function (result) {
                        console.log(result)
                    }, function (error) {
                        console.log(error)
                    })


                  name = userSignup.displayName;
                  email = userSignup.email;
                  photoUrl = userSignup.imgUrl;
                  uid = userSignup.uid;
                  state = userSignup.state;




                  UsuarioService.setUser({
                    "displayName": userSignup.displayname,
                    "email": user.email,
                    "imageUrl": document.getElementById("photo_profile").value,
                    "userId": user.uid,
                    "state": userSignup.state

                  });



                    user.updateProfile({
                        displayName: userSignup.displayname,
                        imgURL: userSignup.imgURL,
                      state : userSignup.state


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


    }]);

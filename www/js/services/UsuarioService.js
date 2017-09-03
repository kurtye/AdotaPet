/**
 * Created by Ruben on 03/06/2017.
 */
angular.module('UsuarioServices', [])
    .service('UsuarioService', [function () {

        const rootRef = firebase.database();

        this.setUser = function (user_data) {
            window.localStorage.starter_facebook_user = JSON.stringify(user_data);

            firebase.database().ref('usuarios/' + user_data.userId).set(user_data);
        };

      this.updateUser = function (user_data) {
        console.log(user_data)
        window.localStorage.starter_facebook_user = JSON.stringify(user_data);
        firebase.database().ref('usuarios/' + user_data.userId).update(user_data);
      };

        this.getUser = function () {
            return JSON.parse(window.localStorage.starter_facebook_user || '{}');
        };

        this.verificarUsuario = function (id_pet) {

            return rootRef.ref('adocao/pets/' + id_pet);
        };

        this.getDadosUsuario = function (id) {

            var usuario;

            rootRef.ref('usuarios/' + id).once('value', function (snap) {

                usuario = snap.val();
                return usuario;

            });
        };

        this.getAllUsuarios = function () {
            return rootRef.ref('usuarios');
        };

    }]);

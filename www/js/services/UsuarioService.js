/**
 * Created by Ruben on 03/06/2017.
 */
angular.module('UsuarioServices', [])
    .service('UsuarioService', [function () {

        this.getUsuario = function () {

            var UserLogado = this.getUser();
            const rootRef = firebase.database();
            return rootRef.ref('/usuarios/' + UserLogado.userId).once('value');

        };

        this.setUser = function (user_data) {
            console.log(user_data);
            window.localStorage.starter_facebook_user = JSON.stringify(user_data);

            firebase.database().ref('usuarios/' + user_data.userId).set(user_data);
        };

        this.getUser = function () {
            return JSON.parse(window.localStorage.starter_facebook_user || '{}');
        };

    }]);
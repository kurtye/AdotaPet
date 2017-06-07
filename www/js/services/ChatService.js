angular.module('ChatServices', [])
    .service('ChatService', ['UsuarioService', function (UsuarioService) {

        const salasRef = firebase.database().ref('chat/salas');
        const msgRef = firebase.database().ref('chat/mensagens');


        var dadosSala = [];
        var dadosMensagem = [];
        var petKey;
        var dono;
        var id_interessado = UsuarioService.getUser().userId;


        this.setDados = function (id_dono, pet) {
            dono = id_dono;
            petKey = pet;

        };
        this.checarSala = function (id_dono, id_interessado, id_pet) {

            var group = id_dono + '_' + id_interessado + '_' + id_pet;
            var salas = [];
            salasRef.orderByChild('dono_interessado_pet').equalTo(group).on('value', function (snap) {
                salas.push(snap.val());

            });
            console.log(salas, 'resultado');

            var retorno = true ? salas.length > 0 : false;

            return retorno;

        };
        this.enviarMensagem = function (msg) {
            // Se ja existe uma sala criada, inserir a mensagem na sala existente, se não, criar nova sala.
            var novaSala = this.checarSala(dono, id_interessado, petKey);

            var group = dono + '_' + id_interessado + '_' + petKey;
            console.log(group, 'enviar');


            console.log(novaSala);
            if (novaSala) {
                var objSala = {id_dono: dono, id_interessado: id_interessado, pet: petKey, dono_interessado_pet: group};
                var objMsg = {
                    id_dono: dono,
                    id_interessado: id_interessado,
                    pet: petKey,
                    dono_interessado_pet: group,
                    msg: msg
                };
                salasRef.push(objSala);
                msgRef.push(objMsg);
                return true;
            } else {
                var objMsg = {
                    id_dono: dono,
                    id_interessado: id_interessado,
                    pet: petKey,
                    dono_interessado_pet: group,
                    msg: msg
                };
                msgRef.push(objMsg);
                return true;
            }
        };

        this.getMessages = function () {

        };

        this.getMyChats = function () {

            var myChats = [];
            var salas = firebase.database().ref('chat/salas').orderByChild('id_interessado').equalTo(id_interessado);

            salas.on('value', function (snap) {
                myChats.unshift(snap.val());
                console.log(myChats);

                return myChats;
            });
        }


    }]);
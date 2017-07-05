angular.module('ChatServices', [])
    .service('ChatService', ['UsuarioService', '$ionicScrollDelegate', function (UsuarioService) {

        const salasRef = firebase.database().ref('chat/salas');
        const msgRef = firebase.database().ref('chat/mensagens');


        var dadosSala = [];
        var dadosMensagem = [];

        var chat = {
            petKey:   null,
            nomePet:  null,
            imagePet: null,
            id_dono:  null,
            dono:     null,
            nomeDono: null,
            meu_id: UsuarioService.getUser().userId,
            interessado: null,
            agrupados: null
        };


        //O group so é preenchido quando eu clico na sala, pelo perfil sempre sera nulo;
        this.setDados = function (objPet, petKey, group, rota) {
            chat.petKey = petKey;
            chat.nomePet = objPet.nome;
            chat.imagePet = objPet.imgURL;
            chat.agrupados = group;
            if(rota){
                chat.dono = objPet.user.id;
                chat.id_dono = objPet.id_dono;
                chat.nomeDono = objPet.user.nome;
                chat.interessado = UsuarioService.getUser().displayName;
            }

        };
        this.getDadosAgrupados = function () {
            if (!chat.agrupados) {
                var group = chat.dono + '_' + chat.meu_id + '_' + chat.petKey;
                return group;
            }
            return chat.agrupados;

        };

        this.getDados = function () {
            return chat;
        };

        this.enviarMensagem = function (msg) {
            // Se ja existe uma sala criada, inserir a mensagem na sala existente, se não, criar nova sala.

            var group = this.getDadosAgrupados();

            console.log(group, 'agrupados');

            salasRef.orderByChild('dono_interessado_pet').equalTo(group).once('value', function (snap) {

                var salas = snap.val();

                if (salas == null) {
                    var objSala = {
                        id_dono: chat.dono,
                        nomeDono: chat.nomeDono,
                        id_interessado: chat.meu_id,
                        nomeInteressado: chat.interessado,
                        pet: chat.petKey,
                        nomePet: chat.nomePet,
                        imagePet: chat.imagePet,
                        dono_interessado_pet: group
                    };
                    var objMsg = {
                        dono_interessado_pet: group,
                        autor: chat.meu_id,
                        msg: msg
                    };
                    salasRef.push(objSala);
                    msgRef.push(objMsg);
                } else {
                    var objMsg = {
                        dono_interessado_pet: group,
                        autor: chat.meu_id,
                        msg: msg
                    };
                    msgRef.push(objMsg);
                }
                return true;
            });

        };

        this.getMessages = function (key) {
            return firebase.database().ref('chat/mensagens').orderByChild('dono_interessado_pet').equalTo(key);

        };

        this.getSalasEnviadas = function () {

            return  firebase.database().ref('chat/salas').orderByChild('id_interessado').equalTo(chat.meu_id);

        };

        this.getSalasRecebidas = function () {

            return firebase.database().ref('chat/salas').orderByChild('id_dono').equalTo(chat.meu_id);

        };


    }]);
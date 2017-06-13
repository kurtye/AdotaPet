angular.module('PetServices', [])
    .service('PetService', [function () {

        const rootRef = firebase.database();

        var pet = {
            descricao:     null,
            especie:       null,
            estado:        null,
            idade:         null,
            imgURL:        null,
            nome:          null,
            dt_publicacao: null,
            user: {
                email: null,
                nome:  null,
                foto:  null,
                id:    null
            }
        };

        this.setPet = function (key) {

            if (!key) {
                return false;
            }

            rootRef.ref("adocao/pets/" + key).once("value", function (snap) {
                pet.descricao = snap.val().descricao;
                pet.especie = snap.val().especieSelecionado;
                pet.estado = snap.val().estado;
                pet.idade = snap.val().idade;
                pet.imgURL = snap.val().imgURL;
                pet.nome = snap.val().nome;
                pet.dt_publicacao = snap.val().time;

                pet.user.email = snap.val().email;
                pet.user.nome = snap.val().nomeUsuario;
                pet.user.foto = snap.val().userFoto;
                pet.user.id = snap.val().usuario;

            }, function (errorObject) {
                console.log("Erro ao setar pet" + errorObject.code);
            });


        };

        this.getPet = function () {
            return pet;
        };
        this.getPetsRef = function () {

            return rootRef.ref('adocao/pets/');

        };

        this.updatePet = function (pet, key) {

            if (key) {

                return firebase.database().ref('adocao/pets/' + key).set(pet);
            }

            return firebase.database().ref('adocao/pets/').push(pet);


        };

    }]);
angular.module('PetServices', [])
    .service('PetService', [function () {

        const rootRef = firebase.database();

        var pet = {
            descricao: null,
            especie: null,
            raca: null,
            estado: null,
            idade: null,
            imgURL: null,
            nome: null,
            dt_publicacao: null,
            user: {
                email: null,
                nome: null,
                foto: null,
                id: null
            }
        };

        this.setPet = function (key) {

            if (!key) {
                return false;
            }

            rootRef.ref("adocao/pets/" + key).once("value", function (snap) {
                pet.descricao = snap.val().descricao;
                pet.especie = snap.val().especie;
                pet.raca = snap.val().raca;
                pet.estado = snap.val().estado;
                pet.idade = snap.val().idade;
                pet.imgURL = snap.val().imgURL;
                pet.nome = snap.val().nome;
                pet.dt_publicacao = snap.val().dt_publicacao;

                pet.user.email = snap.val().user.email;
                pet.user.nome = snap.val().user.nome;
                pet.user.foto = snap.val().user.foto;
                pet.user.id = snap.val().user.id;

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

        this.marcarComoAdotado = function (pet, key) {

            if (pet && key) {
                rootRef.ref('adocao/pets/adotados/' + key).set(pet);
                rootRef.ref('adocao/pets/' + key).remove();
                return true;
            }
            return false;
        };

        this.getPetsAdotados = function (userId) {
            if (userId) {
                return rootRef.ref('adocao/pets/adotados').orderByChild('user/id').equalTo(userId);
            }
            return false;
        };

        this.desmarcarAdotado = function (pet, key) {

            if (pet && key) {
                rootRef.ref('adocao/pets/adotados/' + key).remove();
                rootRef.ref('adocao/pets/' + key).set(pet);
                return true;
            }
            return false;
        };

        this.getMeusPets = function (userId) {

            if (userId) {
                return rootRef.ref('adocao/pets/').orderByChild('usuario').equalTo(userId);
            }
            return false;

        };

    }]);
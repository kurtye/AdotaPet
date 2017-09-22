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
      sexo: null,
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
        pet.sexo = snap.val().sexo;
        pet.dt_publicacao = snap.val().dt_publicacao;

        pet.user.email = snap.val().user.email;
        pet.user.nome = snap.val().user.nome;
        pet.user.foto = snap.val().user.foto;
        pet.user.id = snap.val().user.id;

      }, function (errorObject) {
        console.log("Erro ao setar pet" + errorObject.code);
        return false;
      });


    };

    this.getPet = function () {
      return pet;
    };


    this.getPetsRef = function () {

      return rootRef.ref('adocao/pets/');

    };

    this.updatePet = function (pet, key) {

      pet.dt_publicacao = Date.now();

      if (key && pet.user.id && pet.imgURL) {

        return firebase.database().ref('adocao/pets/' + key).update(pet);
      }

    };

    this.getNewPetKey = function () {
      return firebase.database().ref('adocao/pets/').push();
    };

    this.marcarComoAdotado = function (pet, key) {

      if (pet && key) {
        rootRef.ref('adocao/adotados/' + key).set(pet);
        rootRef.ref('adocao/pets/' + key).remove();
        return true;
      }
      return false;
    };

    this.getPetsAdotados = function (userId) {
      if (userId) {
        return rootRef.ref('adocao/adotados').orderByChild('user/id').equalTo(userId);
      }
      return false;
    };

    this.desmarcarAdotado = function (pet, key) {

      if (pet && key) {
        rootRef.ref('adocao/adotados/' + key).remove();
        rootRef.ref('adocao/pets/' + key).set(pet);
        return true;
      }
      return false;
    };

    this.getMeusPets = function (userId) {

      if (userId) {
        return rootRef.ref('adocao/pets/').orderByChild('user/id').equalTo(userId);
      }
      return false;

    };

    this.getThumbnail = function (petImgUrl) {

      if (!petImgUrl) {
        return false;
      }
      var storageRef = firebase.storage().ref('images/adocao/' + key);

      var thumb = 'thumb_' + petImgUrl;
      //dynamically set reference to the file name
      var thisRef = storageRef.child('images/adocao/' + thumb);

      return thisRef;

    };

  }]);

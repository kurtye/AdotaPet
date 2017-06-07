angular.module('PetServices', [])
    .service('PetService', [function () {

        const rootRef = firebase.database();

        this.getPets = function (id) {

            if (id) {

                return rootRef.ref("adocao/pets/" + id);
            }
            return rootRef.ref('adocao/pets/');


        };

        this.setPet = function (pet, key) {

            if (key){

                return firebase.database().ref('adocao/pets/' + key).set(pet);
            }

            return firebase.database().ref('adocao/pets/').push(pet);


        };

    }]);
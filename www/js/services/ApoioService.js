angular.module('ApoioServices', [])
    .service('ApoioService', [function () {

        this.especies = [
            {"nome": "Canina"},
            {"nome": "Felina"},
            {"nome": "Outros"}
        ];

        this.getRacas = function (key) {
            switch (key){
                case "Canina": return aCaninos; break;
                case "Felina": return aFelinos; break;
                case "Outros": return aOutros; break;
            }
        };

        var aCaninos = [
            "Sem Raça Definida (SRD)",
            "Afegão Hound",
            "Affenpinscher",
            "Airedale Terrier",
            "Akita",
            "American Staffordshire Terrier",
            "Basenji",
            "Basset Hound",
            "Beagle",
            "Bearded Collie",
            "Bedlington Terrier",
            "Bichon Frisé",
            "Bloodhound",
            "Bobtail",
            "Boiadeiro Australiano",
            "Boiadeiro Bernês",
            "Border Collie",
            "Border Terrier",
            "Borzoi",
            "Boston Terrier",
            "Boxer",
            "Buldogue",
            "Bull Terrier",
            "Bulmastife",
            "Cairn Terrier",
            "Cane Corso",
            "Cão de Água Português",
            "Cão de Crista Chinês",
            "Cavalier King Charles Spaniel",
            "Chesapeake Bay Retriever",
            "Chihuahua",
            "Chow Chow",
            "Cocker Spaniel",
            "Collie",
            "Coton de Tuléar",
            "Dachshund",
            "Dálmata",
            "Dandie Dinmont Terrier",
            "Doberman",
            "Dogo Argentino",
            "Dogue Alemão",
            "Fila Brasileiro",
            "Fox Terrier (Pelo Duro e Pelo Liso)",
            "Foxhound Inglês",
            "Galgo",
            "Golden Retriever",
            "Grande Boiadeiro Suiço",
            "Greyhound",
            "Grifo da Bélgica",
            "Husky Siberiano",
            "Jack Russell Terrier",
            "King Charles",
            "Komondor",
            "Labradoodle",
            "Labrador",
            "Lakeland Terrier",
            "Leonberger",
            "Lhasa Apso",
            "Lulu da Pomerânia",
            "Malamute do Alasca",
            "Maltês",
            "Mastife",
            "Mastim",
            "Norfolk Terrier",
            "Norwich Terrier",
            "Papillon",
            "Pastor Alemão",
            "Pastor Australiano",
            "Pinscher Miniatura",
            "Poodle",
            "Pug",
            "Rottweiler",
            "ShihTzu",
            "Silky Terrier",
            "Skye Terrier",
            "Staffordshire Bull Terrier",
            "Terra Nova",
            "Terrier Escocês",
            "Tosa",
            "Weimaraner",
            "Welsh Corgi (Cardigan)",
            "Welsh Corgi (Pembroke)",
            "West Highland White Terrier",
            "Whippet",
            "Xoloitzcuintli",
            "Yorkshire Terrier"
        ];

        var aFelinos = [
            "Sem Raça Definida (SRD)",
            "Persa",
            "Siamês",
            "Himalaia",
            "Maine Coon",
            "Angorá",
            "Siberiano",
            "Sphynx",
            "Burmese",
            "Ragdoll",
            "British Shorthair"
        ];

        var aOutros = [
            "Periquito",
            "Papagaio",
            "Cacatua",
            "Canário",
            "Calopsita",
            "Tamandua Bandeira"
        ];


    }]);
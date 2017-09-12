angular.module('perfilCtrls', []).controller('perfilCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'PetService', 'UsuarioService', 'ChatService',
  function ($scope, $state, $rootScope, $stateParams, PetService, UsuarioService, ChatService) {

    var petKey = $stateParams.id;
    $scope.petKey = $stateParams.id;
    PetService.setPet(petKey);


    var petPerfil = PetService.getPet();
    $scope.petPerfil = petPerfil;


    var UserLogado = UsuarioService.getUser();
    var user = UserLogado.userId;
    var postador;

    UsuarioService.verificarUsuario(petKey).once('value', function (snap) {
      postador = snap.val().user.id;
      if (user == postador) {
        $scope.donoDaPostagem = true;
      } else {
        $scope.donoDaPostagem = false;
      }
    });


    $scope.enviarMensagem = function (objPet, petKey) {

      var retorno = ChatService.setDados(objPet, petKey, null, 1);

      var dadosAgrupados = ChatService.getDadosAgrupados();
      $state.go('tabs.conversa', {id: dadosAgrupados});

    };

    $scope.marcarAdotado = function (pet, key) {


      swal({
        title: 'Você tem certeza?',
        text: "O pet não ira mais aparecer na lista para adoção!",
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Confirmar!',
        closeOnConfirm: false
      }, function (isConfirm) {
        if (isConfirm === true) {
          PetService.marcarComoAdotado(pet, key);
          $state.go('tabs.meuspets');
          swal(
            'confirmado!',
            pet.nome + ' adotado',
            'success'
          );
        }
      }); //function.
    };
  }]);

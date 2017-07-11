angular.module('filtrosCtrls', []).controller('filtroCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'ApoioService',
    function ($scope, $rootScope, $stateParams, $state, ApoioService) {

        $scope.filtro = ApoioService.getFiltros();

        $scope.filtrar = function (filtro) {
            var filtros = ApoioService.setFiltros(filtro);
            swal({
                    title: 'Salvo',
                    text: "Filtros aplicados",
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1000
                }
            );
          $state.go('tabs.adote');
          window.location.reload();
        };

        $scope.fechar = function () {
            $state.go('tabs.adote');
            window.location.reload();
        };


    }]);

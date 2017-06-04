angular.module('perfilCtrls', []).controller('perfilCtrl', ['$scope', '$rootScope', '$stateParams',
    function ($scope, $rootScope, $stateParams) {

        $scope.petPerfil = $rootScope.pets[$stateParams.id];

    }]);
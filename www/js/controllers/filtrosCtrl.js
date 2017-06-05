angular.module('filtrosCtrls', []).controller('filtrosCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicModal',
    function ($scope, $rootScope, $stateParams, $ionicModal) {

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });


    }]);

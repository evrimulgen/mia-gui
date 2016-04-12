(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ComputationDetailController', ComputationDetailController);

    ComputationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Computation', 'VolumeOfInterest'];

    function ComputationDetailController($scope, $rootScope, $stateParams, entity, Computation, VolumeOfInterest) {
        var vm = this;
        vm.computation = entity;
        vm.load = function (id) {
            Computation.get({id: id}, function(result) {
                vm.computation = result;
            });
        };
        var unsubscribe = $rootScope.$on('miaApp:computationUpdate', function(event, result) {
            vm.computation = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

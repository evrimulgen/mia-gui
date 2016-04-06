(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('VolumeOfInterestDetailController', VolumeOfInterestDetailController);

    VolumeOfInterestDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'VolumeOfInterest', 'Rtog', 'Computation'];

    function VolumeOfInterestDetailController($scope, $rootScope, $stateParams, entity, VolumeOfInterest, Rtog, Computation) {
        var vm = this;
        vm.volumeOfInterest = entity;
        vm.load = function (id) {
            VolumeOfInterest.get({id: id}, function(result) {
                vm.volumeOfInterest = result;
            });
        };
        var unsubscribe = $rootScope.$on('miaApp:volumeOfInterestUpdate', function(event, result) {
            vm.volumeOfInterest = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

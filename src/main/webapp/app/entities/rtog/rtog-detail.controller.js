(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('RtogDetailController', RtogDetailController);

    RtogDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Rtog', 'VolumeOfInterest'];

    function RtogDetailController($scope, $rootScope, $stateParams, entity, Rtog, VolumeOfInterest) {
        var vm = this;
        vm.rtog = entity;
        vm.load = function (id) {
            Rtog.get({id: id}, function(result) {
                vm.rtog = result;
            });
        };
        var unsubscribe = $rootScope.$on('miaApp:rtogUpdate', function(event, result) {
            vm.rtog = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

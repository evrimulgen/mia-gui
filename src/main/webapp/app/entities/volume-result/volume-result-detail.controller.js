(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('VolumeResultDetailController', VolumeResultDetailController);

    VolumeResultDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'VolumeResult'];

    function VolumeResultDetailController($scope, $rootScope, $stateParams, entity, VolumeResult) {
        var vm = this;
        vm.volumeResult = entity;
        
        var unsubscribe = $rootScope.$on('miaApp:volumeResultUpdate', function(event, result) {
            vm.volumeResult = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

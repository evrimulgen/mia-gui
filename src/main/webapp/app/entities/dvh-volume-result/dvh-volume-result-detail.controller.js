(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhVolumeResultDetailController', DvhVolumeResultDetailController);

    DvhVolumeResultDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'DvhVolumeResult'];

    function DvhVolumeResultDetailController($scope, $rootScope, $stateParams, entity, DvhVolumeResult) {
        var vm = this;
        vm.dvhVolumeResult = entity;
        
        var unsubscribe = $rootScope.$on('miaApp:dvhVolumeResultUpdate', function(event, result) {
            vm.dvhVolumeResult = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

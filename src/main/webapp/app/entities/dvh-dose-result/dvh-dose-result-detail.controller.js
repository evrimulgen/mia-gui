(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhDoseResultDetailController', DvhDoseResultDetailController);

    DvhDoseResultDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'DvhDoseResult'];

    function DvhDoseResultDetailController($scope, $rootScope, $stateParams, entity, DvhDoseResult) {
        var vm = this;
        vm.dvhDoseResult = entity;
        
        var unsubscribe = $rootScope.$on('miaApp:dvhDoseResultUpdate', function(event, result) {
            vm.dvhDoseResult = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

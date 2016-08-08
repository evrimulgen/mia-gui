(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DoseResultDetailController', DoseResultDetailController);

    DoseResultDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'DoseResult'];

    function DoseResultDetailController($scope, $rootScope, $stateParams, entity, DoseResult) {
        var vm = this;
        vm.doseResult = entity;
        
        var unsubscribe = $rootScope.$on('miaApp:doseResultUpdate', function(event, result) {
            vm.doseResult = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

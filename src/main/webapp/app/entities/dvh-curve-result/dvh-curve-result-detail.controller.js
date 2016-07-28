(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhCurveResultDetailController', DvhCurveResultDetailController);

    DvhCurveResultDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'DvhCurveResult'];

    function DvhCurveResultDetailController($scope, $rootScope, $stateParams, entity, DvhCurveResult) {
        var vm = this;
        vm.dvhCurveResult = entity;
        
        var unsubscribe = $rootScope.$on('miaApp:dvhCurveResultUpdate', function(event, result) {
            vm.dvhCurveResult = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

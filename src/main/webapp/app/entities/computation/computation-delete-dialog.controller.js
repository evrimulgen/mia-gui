(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ComputationDeleteController',ComputationDeleteController);

    ComputationDeleteController.$inject = ['$uibModalInstance', 'entity', 'Computation'];

    function ComputationDeleteController($uibModalInstance, entity, Computation) {
        var vm = this;
        vm.computation = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Computation.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

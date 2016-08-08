(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DoseResultDeleteController',DoseResultDeleteController);

    DoseResultDeleteController.$inject = ['$uibModalInstance', 'entity', 'DoseResult'];

    function DoseResultDeleteController($uibModalInstance, entity, DoseResult) {
        var vm = this;
        vm.doseResult = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            DoseResult.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

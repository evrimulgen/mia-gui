(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhDoseResultDeleteController',DvhDoseResultDeleteController);

    DvhDoseResultDeleteController.$inject = ['$uibModalInstance', 'entity', 'DvhDoseResult'];

    function DvhDoseResultDeleteController($uibModalInstance, entity, DvhDoseResult) {
        var vm = this;
        vm.dvhDoseResult = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            DvhDoseResult.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

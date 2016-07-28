(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhCurveResultDeleteController',DvhCurveResultDeleteController);

    DvhCurveResultDeleteController.$inject = ['$uibModalInstance', 'entity', 'DvhCurveResult'];

    function DvhCurveResultDeleteController($uibModalInstance, entity, DvhCurveResult) {
        var vm = this;
        vm.dvhCurveResult = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            DvhCurveResult.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

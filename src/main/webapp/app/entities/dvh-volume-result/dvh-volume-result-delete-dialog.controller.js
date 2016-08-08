(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhVolumeResultDeleteController',DvhVolumeResultDeleteController);

    DvhVolumeResultDeleteController.$inject = ['$uibModalInstance', 'entity', 'DvhVolumeResult'];

    function DvhVolumeResultDeleteController($uibModalInstance, entity, DvhVolumeResult) {
        var vm = this;
        vm.dvhVolumeResult = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            DvhVolumeResult.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

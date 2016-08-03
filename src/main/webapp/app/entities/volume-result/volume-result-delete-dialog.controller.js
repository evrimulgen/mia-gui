(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('VolumeResultDeleteController',VolumeResultDeleteController);

    VolumeResultDeleteController.$inject = ['$uibModalInstance', 'entity', 'VolumeResult'];

    function VolumeResultDeleteController($uibModalInstance, entity, VolumeResult) {
        var vm = this;
        vm.volumeResult = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            VolumeResult.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

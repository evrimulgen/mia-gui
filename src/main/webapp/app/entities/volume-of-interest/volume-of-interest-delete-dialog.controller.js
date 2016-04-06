(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('VolumeOfInterestDeleteController',VolumeOfInterestDeleteController);

    VolumeOfInterestDeleteController.$inject = ['$uibModalInstance', 'entity', 'VolumeOfInterest'];

    function VolumeOfInterestDeleteController($uibModalInstance, entity, VolumeOfInterest) {
        var vm = this;
        vm.volumeOfInterest = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            VolumeOfInterest.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

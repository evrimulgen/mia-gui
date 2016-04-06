(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('VolumeOfInterestDialogController', VolumeOfInterestDialogController);

    VolumeOfInterestDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'VolumeOfInterest', 'Rtog', 'Computation'];

    function VolumeOfInterestDialogController ($scope, $stateParams, $uibModalInstance, entity, VolumeOfInterest, Rtog, Computation) {
        var vm = this;
        vm.volumeOfInterest = entity;
        vm.rtogs = Rtog.query();
        vm.computations = Computation.query();
        vm.load = function(id) {
            VolumeOfInterest.get({id : id}, function(result) {
                vm.volumeOfInterest = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:volumeOfInterestUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.volumeOfInterest.id !== null) {
                VolumeOfInterest.update(vm.volumeOfInterest, onSaveSuccess, onSaveError);
            } else {
                VolumeOfInterest.save(vm.volumeOfInterest, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

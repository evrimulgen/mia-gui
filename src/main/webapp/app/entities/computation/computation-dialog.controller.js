(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ComputationDialogController', ComputationDialogController);

    ComputationDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Computation', 'VolumeOfInterest', 'ModuleConfiguration'];

    function ComputationDialogController ($scope, $stateParams, $uibModalInstance, entity, Computation, VolumeOfInterest, ModuleConfiguration) {
        var vm = this;
        vm.computation = entity;
        vm.volumeofinterests = VolumeOfInterest.query();
        vm.moduleconfigurations = ModuleConfiguration.query();
        vm.load = function(id) {
            Computation.get({id : id}, function(result) {
                vm.computation = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:computationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.computation.id !== null) {
                Computation.update(vm.computation, onSaveSuccess, onSaveError);
            } else {
                Computation.save(vm.computation, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

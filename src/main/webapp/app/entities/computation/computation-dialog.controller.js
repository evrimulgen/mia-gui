(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ComputationDialogController', ComputationDialogController);

    ComputationDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Computation', 'VolumeOfInterest'];

    function ComputationDialogController ($scope, $stateParams, $uibModalInstance, entity, Computation, VolumeOfInterest) {
        var vm = this;
        vm.computation = entity;
        vm.volumeofinterests = VolumeOfInterest.query();
        vm.selectedModule = {};
        vm.load = function(id) {
            Computation.get({id : id}, function(result) {
                vm.computation = result;
            });
        	console.log("load")
        	entity.computationConfiguration = JSON.parse(vm.computation.computationConfiguration)
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
            vm.computation.computationConfiguration = JSON.stringify(vm.configuredComputation);

            if (vm.computation.id !== null) {
                Computation.update(vm.computation, onSaveSuccess, onSaveError);
            } else {
                Computation.save(vm.computation, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        
        vm.selectedModuleName = function(){
        	return vm.selectedModule.moduleName;
        }
        
        vm.modules = [
        {
        	moduleName: "DoseComputation",
        	moduleOperations: ["min","mean","max"]
        },
        {
        	moduleName: "DvhVolumeComputation",
        	moduleOperations: ["min","mean","max"],
        	absoluteOutput: ["true","false"],
        	limit: "integer",
        	volumeType: ["%", "cc"],
        	targetPrescriptionDose: "NaN"
        },
        
        ];
        
    }
})();

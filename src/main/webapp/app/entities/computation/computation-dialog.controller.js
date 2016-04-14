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
        
        entity.$promise.then(function(data){
        	console.log(data.computationConfiguration);
        	vm.configuredComputation = JSON.parse(data.computationConfiguration);
        });
                
        
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
            vm.computation.computationConfiguration = JSON.stringify(vm.configuredComputation);
            
            console.log(vm.computation);
            
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
        	return vm.computation.moduleName;
        }
        

        
        vm.modules = {
	        DoseComputation:
	        {
	        	moduleName: "DoseComputation",
	        	moduleOperations: ["min","mean","max"]
	        },
	        DvhCurveComputation:
	        {
	        	moduleName: "DvhCurveComputation",
	        	absolute: ["true","false"],
	        	binsize: "integer"
	        },
	        DvhDoseComputation:
	        {
	        	moduleName: "DvhDoseComputation",
	        	absoluteOutput: ["true","false"],
	        	limit: "integer",
	        	volumeType: ["%", "cc"],
	        },
	        DvhVolumeComputation:
	        {
	        	moduleName: "DvhVolumeComputation",
	        	absoluteOutput: ["true","false"],
	        	limit: "integer"
	        },
	        VolumeComputation:
	        {
	        	moduleName: "VolumeComputation",
	        }
        };
	    
	        
	      
        
    }
})();

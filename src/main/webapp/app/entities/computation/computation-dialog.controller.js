(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ComputationDialogController', ComputationDialogController);

    ComputationDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Computation', 'VolumeOfInterest'];

    function ComputationDialogController ($scope, $stateParams, $uibModalInstance, entity, Computation, VolumeOfInterest) {
        var vm = this;
        vm.computation = entity;
        vm.volumeofinterests = VolumeOfInterest.query({page: 0, size: 1000});
        
        try{
        	entity.$promise.then(function(data){
        		vm.configuredComputation = JSON.parse(data.computationConfiguration);
        	});
        }
        catch(e){
        	console.log("Create new entity --> try catch issue for undefined entity");
        }
                
        
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
	        	absolute: ["true","false"]
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

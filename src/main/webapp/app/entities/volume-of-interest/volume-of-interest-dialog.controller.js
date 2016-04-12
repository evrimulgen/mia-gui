(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('VolumeOfInterestDialogController', VolumeOfInterestDialogController);

    VolumeOfInterestDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'VolumeOfInterest', 'Rtog', 'Computation','AlertService'];

    function VolumeOfInterestDialogController ($scope, $stateParams, $uibModalInstance, entity, VolumeOfInterest, Rtog, Computation, AlertService) {
        var vm = this;
        vm.volumeOfInterest = entity;
        vm.rtogs = Rtog.query();
        vm.selectedRtog = "";
        vm.computations = Computation.query();
        vm.load = function(id) {
            VolumeOfInterest.get({id : id}, function(result) {
                vm.volumeOfInterest = result;
            });
        };
      
        
        if(!vm.volumeOfInterest.rtogs)
        	vm.volumeOfInterest.rtogs = [];
        if(!vm.volumeOfInterest.operators)
    		vm.volumeOfInterest.operators = [];
        
        
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
        
        vm.addRtog = function(){
        	if(vm.selectedRtog.id && rtogs.indexOf(vm.selectedRtog)==-1)
        	vm.volumeOfInterest.rtogs.push(vm.selectedRtog);
        }
        
        vm.removeRtog = function(index){
        	if (index > -1) {
        		vm.volumeOfInterest.rtogs.splice(index, 1);
        	}
        }
        
        vm.addOperationPlus = function(){   
        	var rtogLength = vm.volumeOfInterest.rtogs.length-1;
        	
        	var operationLength = vm.volumeOfInterest.operators.length;
        	if(rtogLength > operationLength){
        		vm.volumeOfInterest.operators.push("PLUS");
        	}
        }
        
        vm.addOperationMinus = function(){
        	if(vm.volumeOfInterest.rtogs.length-1 > vm.volumeOfInterest.operators.length){
        	vm.volumeOfInterest.operators.push("MINUS");
        	}
        	else{
        		AlertService.error("This is an error message, it is red");
        	}
        }
        
        vm.removeOperation = function(index){
        	if (index > -1) {
        		vm.volumeOfInterest.operators.splice(index, 1);
        	}
        }
        
        
    }
})();

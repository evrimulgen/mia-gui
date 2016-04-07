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
        vm.selectedRtog = {};
        vm.computations = Computation.query();
        vm.load = function(id) {
            VolumeOfInterest.get({id : id}, function(result) {
                vm.volumeOfInterest = result;
            });
        };
        vm.volumeOfInterest.rtoglist = [];
        
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
        
        vm.addRtog = function(rtog){
        	console.log("add rtog:" + vm.selectedRtog.name);
        	vm.volumeOfInterest.rtoglist.push(vm.selectedRtog);
        	console.log("list:" + vm.volumeOfInterest.rtoglist);
        }
        
        vm.removeRtog = function(index){
        	console.log("remove rtog:" + index);
        	//var index = vm.volumeOfInterest.rtoglist.findIndex(x => x.name==name);
        	if (index > -1) {
        		vm.volumeOfInterest.rtoglist.splice(index, 1);
        	}
        	console.log("list:" + vm.volumeOfInterest.rtoglist);
        }
    }
})();

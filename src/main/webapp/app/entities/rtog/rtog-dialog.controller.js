(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('RtogDialogController', RtogDialogController);

    RtogDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Rtog', 'VolumeOfInterest'];

    function RtogDialogController ($scope, $stateParams, $uibModalInstance, entity, Rtog, VolumeOfInterest) {
        var vm = this;
        vm.rtog = entity;
        vm.volumeofinterests = VolumeOfInterest.query();
        vm.load = function(id) {
            Rtog.get({id : id}, function(result) {
                vm.rtog = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:rtogUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.rtog.id !== null) {
                Rtog.update(vm.rtog, onSaveSuccess, onSaveError);
            } else {
                Rtog.save(vm.rtog, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

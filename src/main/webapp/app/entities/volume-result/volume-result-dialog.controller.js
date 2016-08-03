(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('VolumeResultDialogController', VolumeResultDialogController);

    VolumeResultDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'VolumeResult'];

    function VolumeResultDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, VolumeResult) {
        var vm = this;
        vm.volumeResult = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:volumeResultUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.volumeResult.id !== null) {
                VolumeResult.update(vm.volumeResult, onSaveSuccess, onSaveError);
            } else {
                VolumeResult.save(vm.volumeResult, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

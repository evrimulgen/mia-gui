(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhVolumeResultDialogController', DvhVolumeResultDialogController);

    DvhVolumeResultDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'DvhVolumeResult'];

    function DvhVolumeResultDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, DvhVolumeResult) {
        var vm = this;
        vm.dvhVolumeResult = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:dvhVolumeResultUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.dvhVolumeResult.id !== null) {
                DvhVolumeResult.update(vm.dvhVolumeResult, onSaveSuccess, onSaveError);
            } else {
                DvhVolumeResult.save(vm.dvhVolumeResult, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhDoseResultDialogController', DvhDoseResultDialogController);

    DvhDoseResultDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'DvhDoseResult'];

    function DvhDoseResultDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, DvhDoseResult) {
        var vm = this;
        vm.dvhDoseResult = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:dvhDoseResultUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.dvhDoseResult.id !== null) {
                DvhDoseResult.update(vm.dvhDoseResult, onSaveSuccess, onSaveError);
            } else {
                DvhDoseResult.save(vm.dvhDoseResult, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

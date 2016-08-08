(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DoseResultDialogController', DoseResultDialogController);

    DoseResultDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'DoseResult'];

    function DoseResultDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, DoseResult) {
        var vm = this;
        vm.doseResult = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:doseResultUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.doseResult.id !== null) {
                DoseResult.update(vm.doseResult, onSaveSuccess, onSaveError);
            } else {
                DoseResult.save(vm.doseResult, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

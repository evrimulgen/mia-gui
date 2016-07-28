(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhCurveResultDialogController', DvhCurveResultDialogController);

    DvhCurveResultDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'DvhCurveResult'];

    function DvhCurveResultDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, DvhCurveResult) {
        var vm = this;
        vm.dvhCurveResult = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:dvhCurveResultUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.dvhCurveResult.id !== null) {
                DvhCurveResult.update(vm.dvhCurveResult, onSaveSuccess, onSaveError);
            } else {
                DvhCurveResult.save(vm.dvhCurveResult, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

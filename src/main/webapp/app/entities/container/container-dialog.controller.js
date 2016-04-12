(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ContainerDialogController', ContainerDialogController);

    ContainerDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Container'];

    function ContainerDialogController ($scope, $stateParams, $uibModalInstance, entity, Container) {
        var vm = this;
        vm.container = entity;
        vm.load = function(id) {
            Container.get({id : id}, function(result) {
                vm.container = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:containerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.container.id !== null) {
                Container.update(vm.container, onSaveSuccess, onSaveError);
            } else {
                Container.save(vm.container, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

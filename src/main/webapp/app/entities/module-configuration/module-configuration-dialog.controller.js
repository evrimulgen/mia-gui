(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ModuleConfigurationDialogController', ModuleConfigurationDialogController);

    ModuleConfigurationDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'ModuleConfiguration', 'Computation', 'Configuration'];

    function ModuleConfigurationDialogController ($scope, $stateParams, $uibModalInstance, entity, ModuleConfiguration, Computation, Configuration) {
        var vm = this;
        vm.moduleConfiguration = entity;
        vm.computations = Computation.query();
        vm.configurations = Configuration.query();
        vm.load = function(id) {
            ModuleConfiguration.get({id : id}, function(result) {
                vm.moduleConfiguration = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:moduleConfigurationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.moduleConfiguration.id !== null) {
                ModuleConfiguration.update(vm.moduleConfiguration, onSaveSuccess, onSaveError);
            } else {
                ModuleConfiguration.save(vm.moduleConfiguration, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

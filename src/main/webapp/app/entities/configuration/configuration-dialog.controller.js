(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ConfigurationDialogController', ConfigurationDialogController);

    ConfigurationDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Configuration', 'Computation'];

    function ConfigurationDialogController ($scope, $stateParams, $uibModalInstance, entity, Configuration, Computation) {
        var vm = this;
        vm.configuration = entity;
        vm.computations = Computation.query();
        vm.load = function(id) {
            Configuration.get({id : id}, function(result) {
                vm.configuration = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('miaApp:configurationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.configuration.id !== null) {
                Configuration.update(vm.configuration, onSaveSuccess, onSaveError);
            } else {
                Configuration.save(vm.configuration, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ModuleConfigurationDeleteController',ModuleConfigurationDeleteController);

    ModuleConfigurationDeleteController.$inject = ['$uibModalInstance', 'entity', 'ModuleConfiguration'];

    function ModuleConfigurationDeleteController($uibModalInstance, entity, ModuleConfiguration) {
        var vm = this;
        vm.moduleConfiguration = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ModuleConfiguration.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

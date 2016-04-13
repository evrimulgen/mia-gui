(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ContainerDeleteController',ContainerDeleteController);

    ContainerDeleteController.$inject = ['$uibModalInstance', 'entity', 'Container'];

    function ContainerDeleteController($uibModalInstance, entity, Container) {
        var vm = this;
        vm.container = entity;
        console.log(entity);
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Container.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('RtogDeleteController',RtogDeleteController);

    RtogDeleteController.$inject = ['$uibModalInstance', 'entity', 'Rtog'];

    function RtogDeleteController($uibModalInstance, entity, Rtog) {
        var vm = this;
        vm.rtog = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Rtog.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

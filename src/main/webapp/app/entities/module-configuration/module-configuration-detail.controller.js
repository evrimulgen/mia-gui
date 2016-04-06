(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ModuleConfigurationDetailController', ModuleConfigurationDetailController);

    ModuleConfigurationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ModuleConfiguration', 'Computation', 'Configuration'];

    function ModuleConfigurationDetailController($scope, $rootScope, $stateParams, entity, ModuleConfiguration, Computation, Configuration) {
        var vm = this;
        vm.moduleConfiguration = entity;
        vm.load = function (id) {
            ModuleConfiguration.get({id: id}, function(result) {
                vm.moduleConfiguration = result;
            });
        };
        var unsubscribe = $rootScope.$on('miaApp:moduleConfigurationUpdate', function(event, result) {
            vm.moduleConfiguration = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ConfigurationDetailController', ConfigurationDetailController);

    ConfigurationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Configuration', 'Computation'];

    function ConfigurationDetailController($scope, $rootScope, $stateParams, entity, Configuration, Computation) {
        var vm = this;
        vm.configuration = entity;
        vm.load = function (id) {
            Configuration.get({id: id}, function(result) {
                vm.configuration = result;
            });
        };
        var unsubscribe = $rootScope.$on('miaApp:configurationUpdate', function(event, result) {
            vm.configuration = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

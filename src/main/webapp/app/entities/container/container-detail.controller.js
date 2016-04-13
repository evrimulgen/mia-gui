(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ContainerDetailController', ContainerDetailController);

    ContainerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Container'];

    function ContainerDetailController($scope, $rootScope, $stateParams, entity, Container) {
        var vm = this;
        vm.container = entity;
        vm.load = function (id) {
            Container.get({id: id}, function(result) {
                vm.container = result;
            });
        };
        var unsubscribe = $rootScope.$on('miaApp:containerUpdate', function(event, result) {
            vm.container = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

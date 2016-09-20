(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ConfigurationDialogController', ConfigurationDialogController);

    ConfigurationDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Configuration', 'Computation', 'Principal'];
    
    function ConfigurationDialogController ($scope, $stateParams, $uibModalInstance, entity, Configuration, Computation, Principal) {
        var vm = this;
        vm.configuration = entity;
        vm.computations = Computation.query({page: 0, size: 1000});
        vm.selectedComputation = {};
        vm.account = null;

        console.log(vm.computations)
        vm.load = function(id) {
            Configuration.get({id : id}, function(result) {
                vm.configuration = result;
            });
        };
        
        if(!vm.configuration.computations)
        	vm.configuration.computations = [];

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
            	console.log(vm.configuration.computations);
            	
                Configuration.update(vm.configuration, onSaveSuccess, onSaveError);
            } else {
            	vm.configuration.userId = vm.account.login;
                Configuration.save(vm.configuration, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        
        vm.addComputation = function(){
        	if(vm.selectedComputation.id && vm.configuration.computations.indexOf(vm.selectedComputation)==-1){
        		vm.configuration.computations.push(vm.selectedComputation);
        	}
        }
        
        vm.removeComputation= function(index){
        	if (index > -1) {
        		vm.configuration.computations.splice(index, 1);
        	}
        }
        
        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
            });
        }
    }
})();

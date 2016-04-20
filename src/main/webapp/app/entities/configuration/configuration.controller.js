(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ConfigurationController', ConfigurationController);

    ConfigurationController.$inject = ['$scope', '$state', '$http','Configuration', 'ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants'];

    function ConfigurationController ($scope, $state, $http, Configuration, ParseLinks, AlertService, pagingParams, paginationConstants) {
        var vm = this;
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.loadAll();

        function loadAll () {
            Configuration.query({
                page: pagingParams.page - 1,
                size: paginationConstants.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.configurations = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage (page) {
            vm.page = page;
            vm.transition();
        }

        function transition () {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }
        
        vm.startScp = function(userId, port){
        	var data = $.param({	
        	});
        	$http.post("fileservice/" + "api/storescp/start?aeTitle="+userId+"&port="+port, data).then(
        			function(data, status){
        			}, 
        			function(data, status){
        				AlertService.error(data.statusText);
        			});
        };

        vm.stopScp = function(port){
        	var data = $.param({	
        	});
        	$http.post("fileservice/" + "api/storescp/stop?port="+port, data).then(
        			function(data, status){
        			}, 
        			function(data, status){
        				AlertService.error(data.statusText);
        			});
        }

    }
})();

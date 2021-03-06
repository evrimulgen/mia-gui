(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('ContainerController', ContainerController);

    ContainerController.$inject = ['$scope', '$state', '$http', 'Container', 'ContainerSearch', 'ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants'];

    function ContainerController ($scope, $state, $http, Container, ContainerSearch, ParseLinks, AlertService, pagingParams, paginationConstants) {
        var vm = this;
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.clear = clear;
        vm.search = search;
        vm.searchQuery = pagingParams.search;
        vm.currentSearch = pagingParams.search;
        vm.isDisabled = isDisabled;
        vm.isMappingEnabled = isMappingEnabled;
        vm.getModalities = getModalities;
        vm.getMissingRtogs = getMissingRtogs;
        vm.loadAll();

        function loadAll () {
            if (pagingParams.search) {
                ContainerSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            } else {
                Container.query({
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            }
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
                vm.containers = data;
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

        function search (searchQuery) {
            if (!searchQuery){
                return vm.clear();
            }
            vm.links = null;
            vm.page = 1;
            vm.predicate = 'id';
            vm.reverse = true;
            vm.currentSearch = searchQuery;
            vm.transition();
        }

        function clear () {
            vm.links = null;
            vm.page = 1;
            vm.predicate = 'id';
            vm.reverse = true;
            vm.currentSearch = null;
            vm.transition();
        }

        function isDisabled (containerStatus) {
            if(containerStatus == "QUEUE" ||
                containerStatus == "IDLE" ||
                containerStatus == "RUNNING"
                ){
                return true;    
            }
            return false;
        }

        function isMappingEnabled (containerStatus) {
            if(containerStatus == "MAPPINGERROR"){
                return true;    
            }
            return false;
        }
        
        function getModalities (container) {
        	var modalities = [];       	
        	container.dicomPackageEntity.modalities.forEach(
        			function(currentValue){ 
        				modalities.push(currentValue.modality);
        			});
       	
        	return modalities.sort() + "";
        }
        
        function getMissingRtogs(container){
        	var missingRtogs = [];
        	for (var i in container.mappingRtogRoi) {
        		if ('' == container.mappingRtogRoi[i] || null == container.mappingRtogRoi[i]){
        			missingRtogs.push(i);
        		}
        	}
        	return missingRtogs.sort() + "";
        }
        
       
        vm.redoContainer = function(containerId){         	
        	$http({
        		method: 'GET',
        		url: 'manager/' + 'api/container/manual/' + containerId
        	}).then(function successCallback(response) {
        		loadAll();
        	}, function errorCallback(response) {
        		console.log('error: ' + response)
        	});
        }
    }
})();
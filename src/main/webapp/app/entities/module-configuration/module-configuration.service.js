(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('ModuleConfiguration', ModuleConfiguration);

    ModuleConfiguration.$inject = ['$resource'];

    function ModuleConfiguration ($resource) {
        var resourceUrl =  'api/module-configurations/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

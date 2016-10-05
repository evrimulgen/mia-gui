(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('Configuration', Configuration);

    Configuration.$inject = ['$resource'];

    function Configuration ($resource) {
        var resourceUrl =  'configservice/' + 'api/configurations/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.inputPort = angular.fromJson(data.inputPort);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

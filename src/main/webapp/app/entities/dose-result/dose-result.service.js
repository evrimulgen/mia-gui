(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('DoseResult', DoseResult);

    DoseResult.$inject = ['$resource'];

    function DoseResult ($resource) {
        var resourceUrl = 'resultservice/' + 'api/dose-results/:id';

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

(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('Computation', Computation);

    Computation.$inject = ['$resource'];

    function Computation ($resource) {
        var resourceUrl =  'api/computations/:id';

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

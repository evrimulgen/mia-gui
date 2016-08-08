(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('DvhCurveResult', DvhCurveResult);

    DvhCurveResult.$inject = ['$resource'];

    function DvhCurveResult ($resource) {
        var resourceUrl =   'resultservice/' +'api/dvh-curve-results/:id';

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

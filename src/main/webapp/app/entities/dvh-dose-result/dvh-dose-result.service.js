(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('DvhDoseResult', DvhDoseResult);

    DvhDoseResult.$inject = ['$resource'];

    function DvhDoseResult ($resource) {
        var resourceUrl = 'resultservice/' +'api/dvh-dose-results/:id';

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

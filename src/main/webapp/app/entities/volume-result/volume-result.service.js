(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('VolumeResult', VolumeResult);

    VolumeResult.$inject = ['$resource'];

    function VolumeResult ($resource) {
        var resourceUrl =  'resultservice/' + 'api/volume-results/:id';

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

(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('VolumeOfInterest', VolumeOfInterest);

    VolumeOfInterest.$inject = ['$resource'];

    function VolumeOfInterest ($resource) {
        var resourceUrl = 'configservice/' + 'api/volume-of-interests/:id';

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

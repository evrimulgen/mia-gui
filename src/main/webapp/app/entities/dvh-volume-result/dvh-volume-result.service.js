(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('DvhVolumeResult', DvhVolumeResult);

    DvhVolumeResult.$inject = ['$resource'];

    function DvhVolumeResult ($resource) {
        var resourceUrl = 'resultservice/' + 'api/dvh-volume-results/:id';

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

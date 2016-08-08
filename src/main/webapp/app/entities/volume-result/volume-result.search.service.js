(function() {
    'use strict';

    angular
        .module('miaApp')
        .factory('VolumeResultSearch', VolumeResultSearch);

    VolumeResultSearch.$inject = ['$resource'];

    function VolumeResultSearch($resource) {
        var resourceUrl = 'resultservice/' +  'api/_search/volume-results/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

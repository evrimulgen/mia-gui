(function() {
    'use strict';

    angular
        .module('miaApp')
        .factory('DvhVolumeResultSearch', DvhVolumeResultSearch);

    DvhVolumeResultSearch.$inject = ['$resource'];

    function DvhVolumeResultSearch($resource) {
        var resourceUrl = 'resultservice/' +  'api/_search/dvh-volume-results/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

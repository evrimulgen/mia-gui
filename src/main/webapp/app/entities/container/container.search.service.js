(function() {
    'use strict';

    angular
        .module('miaApp')
        .factory('ContainerSearch', ContainerSearch);

    ContainerSearch.$inject = ['$resource'];

    function ContainerSearch($resource) {
        var resourceUrl = 'containerservice/' +  'api/_search/containers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

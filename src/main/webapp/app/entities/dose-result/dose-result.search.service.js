(function() {
    'use strict';

    angular
        .module('miaApp')
        .factory('DoseResultSearch', DoseResultSearch);

    DoseResultSearch.$inject = ['$resource'];

    function DoseResultSearch($resource) {
        var resourceUrl = 'resultservice/' +  'api/_search/dose-results/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

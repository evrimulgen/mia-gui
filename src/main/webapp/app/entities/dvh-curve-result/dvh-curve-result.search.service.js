(function() {
    'use strict';

    angular
        .module('miaApp')
        .factory('DvhCurveResultSearch', DvhCurveResultSearch);

    DvhCurveResultSearch.$inject = ['$resource'];

    function DvhCurveResultSearch($resource) {
        var resourceUrl = 'resultservice/' +  'api/_search/dvh-curve-results/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

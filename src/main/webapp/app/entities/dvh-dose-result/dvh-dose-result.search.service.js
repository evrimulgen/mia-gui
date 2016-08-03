(function() {
    'use strict';

    angular
        .module('miaApp')
        .factory('DvhDoseResultSearch', DvhDoseResultSearch);

    DvhDoseResultSearch.$inject = ['$resource'];

    function DvhDoseResultSearch($resource) {
        var resourceUrl = 'resultservice/' +  'api/_search/dvh-dose-results/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

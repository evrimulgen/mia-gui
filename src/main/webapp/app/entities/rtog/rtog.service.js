(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('Rtog', Rtog);

    Rtog.$inject = ['$resource'];

    function Rtog ($resource) {
        var resourceUrl =  'configservice/' + 'api/rtogs/:id';

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

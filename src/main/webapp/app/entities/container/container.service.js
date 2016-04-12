(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('Container', Container);

    Container.$inject = ['$resource'];

    function Container ($resource) {
        var resourceUrl =  'containerservice/' + 'api/container/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    return angular.toJson(data);
                }
            }
        });
    }
})();
